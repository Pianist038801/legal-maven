import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, browserHistory } from 'react-router'
import ReactHtmlParser from 'react-html-parser'

import NoteDialog from './NoteDialog'

import County from './datasource/county'
import City from './datasource/city'
import * as countyExemption from './datasource/county_exemption'
import * as cityExemption from './datasource/city_exemption'

// Import Style
import styles from './InputBox.css'

// Import Assets
import check_img from './green_check.png'

class InputBox extends Component {
  constructor(props) {
    super(props)

    this.state = {
      current: 0,
      singleChoice: -1,
      multiChoice: [],
      showNote: false,
      noteTitle: '',
      noteContent: '',
      store: {}
    }

    if (props.program) {
      if (props.history.length) {
        const state = props.history[props.history.length - 1]
        const current = props.progress
        this.state.current = current
        this.singleChoice = -1
        this.multiChoice = []
        this.state.store = state.store
      } else {

      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.program !== nextProps.program) {
      if (!nextProps.history.length) {
        const nextIndex = this.getNodeIndex(nextProps.program.node, nextProps.program.start)
        this.setCurrent(nextProps.program, nextIndex)
      } else {
        const state = nextProps.history[nextProps.history.length - 1]
        const current = nextProps.progress
        this.setState({ current: current, singleChoice: -1, multiChoice: [], store: state.store })
      }
    }
  }

  componentWillUnmount() {
    this.props.showContact()
  }

  getNodeIndex(node, id) {
    for (let i = 0; i < node.length; i++) {
      if (node[i].id === id) {
        return i;
      }
    }
  }

  getNextId(node) {
    if (node.kind === 'Input' || node.kind === 'Multi') {
      return node.content.next;
    }

    if (node.kind === 'Single' || node.kind === 'YesNo') {
      var next = node.content.fields[this.state.singleChoice].next;
      if (!next) next = node.content.next;
      return next;
    }
  }

  doAction(program, node) {
    const store = this.state.store;
    if (node.content.kind === 'CHECK_COUNTY_EXEMPTION') {
      var next = 0;
      if (store['county_exemption'][0] !== false) {
        next = 1;
      }

      const nextIndex = this.getNodeIndex(program.node, node.content.next[next]);
      this.setCurrent(program, nextIndex);
    } else if (node.content.kind === 'CHECK_CITY_EXEMPTION') {
      var next = 0;
      if (store['city_exemption'][0] !== false) {
        next = 1;
      }

      const nextIndex = this.getNodeIndex(program.node, node.content.next[next]);
      this.setCurrent(program, nextIndex);
    }

    var next = '';
    switch (node.content.kind) {
      case 'SET_VALUE':
        store[node.content.store] = node.content.value;
        this.setState({store});
        next = node.content.next;
        break;
      case 'ADD_VALUE':
        store[node.content.store] += node.content.value;
        this.setState({store});
        next = node.content.next;
        break;
      case 'SWITCH_VALUE':
        let value = node.content.value;
        var i;
        for (i = 0; i < value.length; i++) {
          if (store[node.content.store] <= value[i]) break;
        }
        next = node.content.next[i];
        break;
    }

    if (next) {
      if (program) {
        var nextIndex = this.getNodeIndex(program.node, next);
        this.setCurrent(program, nextIndex);
      }
    }
  }

  setCurrent(program, curIndex) {
    const node = program.node[curIndex];
    const kind = node.kind.toLowerCase();

    if (kind === 'input' || kind === 'single' || kind === 'yesno' || kind === 'multi') {
      this.setState({ current: curIndex, singleChoice: -1, multiChoice: [] });
      return;
    }

    if (kind === 'goto') {
      var path = '/';
      if (node.content.kind === 'form')
        path += 'legalforms/';

      path += node.content.id;
      browserHistory.push(path);
    }

    if (kind === 'action') {
      this.doAction(program, node);
    }

    if (kind === 'final') {
      // this.props.history.pop();
      this.props.stepBack()
      var message = node.content.message ? node.content.message : '';
      if (node.content.attach) {
        node.content.attach.forEach((elt) => { message += program.attach[elt] })
      }

      if (node.content.kind === 'Form') {
        this.props.setFinalNode('Form', { form: node.content.form, info: { ...this.state.store } });
      } else if (node.content.kind === 'CalculateTax') {
        const county_exemption = countyExemption.exemption(this.state.store['county']);
        const countyTaxRate = parseFloat(county_exemption[0].split(';')[2]);
        const city_exemption = cityExemption.exemption(this.state.store['county'], this.state.store['city']);
        const cityTaxRate = parseFloat(city_exemption[0].split(';')[3]);
        calcTaxInfo = { county: this.state.store['county'], city: this.state.store['city'], countyTaxRate, cityTaxRate, countyExemptions: this.state.store['county_exemption'], cityExemptions: this.state.store['city_exemption'] };

        this.props.setFinalNode('CalculateTax', { calcTaxInfo });
      } else {
        var calcTaxInfo;
        if (node.content.next === 'CalculateTax') {
          const county_exemption = countyExemption.exemption(this.state.store['county']);
          const countyTaxRate = parseFloat(county_exemption[0].split(';')[2]);
          const city_exemption = cityExemption.exemption(this.state.store['county'], this.state.store['city']);
          const cityTaxRate = parseFloat(city_exemption[0].split(';')[3]);

          calcTaxInfo = { county: this.state.store['county'], city: this.state.store['city'], countyTaxRate, cityTaxRate, countyExemptions: this.state.store['county_exemption'], cityExemptions: this.state.store['city_exemption'] };
        }

        this.props.setFinalNode('Topic', { title: node.content.title, message: message, to: node.content.to, calcTaxInfo });
      }
    }
  }

  setInput(node) { // Save selected choice in store
    if (node.kind === 'Single') {
      if (node.content.store) {
        const field = node.content.fields[this.state.singleChoice];
        if (field.kind === 'choice') {
          const store = this.state.store;
          store[node.content.store] = field.value;
          this.setState({store: store});
        }
      }
    } else if (node.kind === 'Multi') {
      if (node.content.store) {
        const store = this.state.store;
        store[node.content.store] = this.state.multiChoice;
        this.setState({store: store});
      }
    }
  }

  onNext(program) {
    const node = program.node[this.state.current];
    this.setInput(node);

    // Check wheter input is empty or not
    var empty = false;
    if (node.kind === 'Input') {
      node.content.fields.forEach(e => {
        if (e.store)
          if (this.state.store[e.store] === '') {
            empty = true;
            return;
          }
      })

      if (node.content.store)
        if (this.state.store[node.content.store] === '')
          empty = true;

      if (empty === true)
        return;
    }

    const next = this.getNextId(node);
    const nextIndex = this.getNodeIndex(program.node, next);

    this.props.stepNext(
      {
      current: this.state.current,
      singleChoice: this.state.singleChoice,
      multiChoice: this.state.multiChoice,
      store: {...this.state.store}
    }, nextIndex);

    this.setCurrent(program, nextIndex);
  }

  onBack() {
    const program = this.props.program

    if (program) {
      if (this.props.history.length === 0) return;

      const state = this.props.history[this.props.history.length - 1];
      this.setState({ current: state.current, singleChoice: state.singleChoice, multiChoice: state.multiChoice, store: state.store });

      this.props.stepBack();
    }
  }

  onSingleSelect(index) {
    this.setState({ singleChoice: index });
  }

  onMultiSelect(index, noneApplyIndex) {
    var multiChoice = this.state.multiChoice;
    if (index === noneApplyIndex) {
      multiChoice = [];
    } else {
      multiChoice[noneApplyIndex] = false;
    }
    multiChoice[index] = !multiChoice[index];
    this.setState({ multiChoice });
  }

  getDescription(kind) {
    switch (kind) {
      case 'Input':
        return '';

      case 'Single':
        return '';

      case 'YesNo':
        return '';

      case 'Multi':
        return 'Please check any that apply.';
    }
  }

  onInput(event, node, field) {
    var storeName = field.store;
    if (!storeName) storeName = node.content.store;
    if (storeName) {
      const store = this.state.store;
      store[storeName] = event.target.value;
      this.setState({store: store});
    }
  }

  onSelectChange(event, field) {
    const store = this.state.store;
    if (field.store === 'county') {
      store['city'] = undefined;
    }
    store[field.store] = event.target.value;
    this.setState({store});
  }

  buildField(node, field, index) {
    const kind = node.kind;
    const check_url = this.state.singleChoice === index ? `url(${check_img})` : '';

    if (kind === 'Single' || kind === 'YesNo' ) {
      var storeName = field.store;
      if (!storeName) storeName = node.content.store;
      if (field.kind === 'number' || field.kind === 'text') {
        if (this.state.store[storeName] === undefined) {
          this.state.store[storeName] = '';
        }
      }

      return (
        <div key={index} className={`${styles.answer} ${this.state.singleChoice === index ? styles.active : ''} `} onClick={() => this.onSingleSelect(index)} style={{ backgroundImage: check_url }}>
          { this.replaceStoreValue(field.label) }
          { (field.kind === 'number' || field.kind === 'text') ? <input type={field.kind} className={styles.input} value={this.state.store[storeName]} onChange={(event) => {this.onInput(event, node, field)}} /> : null  }
          { field.note && <i className="fa fa-info-circle" aria-hidden="true" onClick={()=>{alert('info')}}></i>}
        </div>
      );
    }

    if (kind === 'Input') {
      if (field.kind === 'select') {
        var datasource = null;
        const store = this.state.store;

        if (field.datasource === 'county') {
          if (!store['county']) store['county'] = County[0].name;
          datasource = County.map((elt, i) => {
            return (<option key={i} value={elt.name}>{elt.name}</option>)
          });
        } else if (field.datasource === 'city') {
          const city = City.filter(elt => (elt.county === store['county']));

          if (!store['city']) store['city'] = city.length ? city[0].city: '';
          datasource = city.map((elt, i) => {
            return (<option key={i} value={elt.city}>{elt.city}</option>)
          });
        }

        return (
          <select key={index} className={styles.input} value={store[field.store]} onChange={event => this.onSelectChange(event, field)}>
            { datasource }
          </select>
        );
      }
      else {
        if (this.state.store[field.store] === undefined) {
          this.state.store[field.store] = '';
        }
        return (
          <input type={field.kind} key={index} className={`${styles.input}`} value={this.state.store[field.store]} onChange={(event) => {this.onInput(event, node, field)}} placeholder={field.placeholder} />
        );
      }
    }

    if (kind === 'Multi') { // use index 0 as None Apply
      if (field.datasource === 'county_exemption_list') {
        const exemption = countyExemption.exemption(this.state.store['county']);
        const { indexArray, label, note } = countyExemption;
        let eleExemptions = indexArray
          .map( (elt, i) => {
            if (exemption[indexArray[i]] !== 'x') return;
            return (
              <div key={i} className={`${styles.answer} ${this.state.multiChoice[i] ? styles.active : ''}`} onClick={() => this.onMultiSelect(i, 0)}>
                { label[indexArray[i]] }
                { <i className={`fa fa-info-circle ${styles['note-icon']}`} aria-hidden="true" onClick={e => this.openNote(e, 'Note', note[indexArray[i]])} />}
              </div>
            );
          });

        return (
          <div key={index}>
            { eleExemptions }
            <div className={`${styles.answer} ${this.state.multiChoice[0] ? styles.active : ''}`} onClick={() => this.onMultiSelect(0, 0)} style={{ backgroundImage: check_url }}>
              None Apply
            </div>
          </div>
        );

      } else if (field.datasource === 'city_exemption_list') {
        const exemption = cityExemption.exemption(this.state.store['county'], this.state.store['city']);
        const { indexArray, label, note } = cityExemption;
        let eleExemptions = indexArray
          .map( (elt, i) => {
            if (exemption[indexArray[i]] !== 'x') return;
            return (
              <div key={i} className={`${styles.answer} ${this.state.multiChoice[i] ? styles.active : ''}`} onClick={() => this.onMultiSelect(i, 0)}>
                { label[indexArray[i]] }
                { <i className={`fa fa-info-circle ${styles['note-icon']}`} aria-hidden="true" onClick={e => this.openNote(e, 'Note', note[indexArray[i]])} />}
              </div>
            );
          });

        return (
          <div key={index}>
            { eleExemptions }
            <div className={`${styles.answer} ${this.state.multiChoice[0] ? styles.active : ''}`} onClick={() => this.onMultiSelect(0, 0)}>
              None Apply
            </div>
          </div>
        );
      }
    }
  }

  closeNote() {
    this.setState({ showNote: false });
  };

  openNote(e, title, content) {
    if (e) e.stopPropagation();
    this.setState({ noteTitle: title, noteContent: content, showNote: true });
  };

  replaceStoreValue(str) {
    let reg=/\${(.*)}/g;

    var vName = reg.exec(str);
    if (vName) {
      str = str.replace(reg, this.state.store[vName[1]]);
    }
    return str;
  }

  render() {
    var lstEle = null;
    var question = null;
    var title = null;
    var description = null;
    var node = null;
    var eleNote = null;
    var note = { title: '', content: '' };

    const program = this.props.program
    if (program) {
      node = program.node[this.state.current];
      if (node.kind === 'Action') {
        this.setCurrent(program, this.state.current)
        return null
      }

      if (node.kind !== 'Form' && node.kind !== 'Action') {

        title = program.description;

        question = `${node.content.question}`;
        question = this.replaceStoreValue(question);
        description = this.getDescription(node.kind);

        if (node.content.note) {
          eleNote = <i className={`fa fa-info-circle ${styles['note-icon-global']}`} aria-hidden="true" onClick={(e) => this.openNote(e, node.content.note.title, node.content.note.content)}></i>;
        }

        lstEle = node.content.fields.map((elt, i) => {
          return this.buildField(node, elt, i);
        });
      }
    }

    if (!this.props.history) {
      return null
    }

    return (
      <div className={`${styles.inputbox}`} style={{display: this.props.show ? 'none' : ''}}>
        <div className={styles.title}>
          { title }
        </div>

        { program && program.step &&
        <div className={styles['progress-container']}>
          <div className={`progress ${styles['progress']}`}>
            <div className="progress-bar active" role="progressbar"
            aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{width: `${this.props.history.length * 100.0 / program.step}%`}}>

            </div>
          </div>
        </div>
        }

        <div className={`${styles['main-container']}`}>
          <div className={styles['question']}>
            <span>{`${this.props.history.length + 1}. `}</span>
            <span>{ ReactHtmlParser(question) }</span>
            { eleNote }
          </div>
          <div className={styles['description']}>
            { description }
          </div>

          <div className={styles['answer-container']}>
            { lstEle }
          </div>

          <div className={styles['button-group']}>
            <div className={`${styles.button} ${this.props.history.length ? '' : styles.disable}`} style={{ float: 'left' }} onClick={ this.onBack.bind(this) }>
              Step Back
            </div>

            <div className={`${styles.button} ${styles.big}`} onClick={ e => this.onNext(program) }>
              Continue
            </div>

            <div className={`${styles.button}`} style={{float: 'right'}} onClick={ e=> this.props.showStepSave() }>
              Save Place
            </div>

          </div>
          <div className={styles['help-container']}>
            <span className={styles['help_text']}>Need some help answering a question or want to save and finish later?</span>

            <div className={`${styles.button} ${styles.help}`} style={{float: 'right'}} onClick={this.props.showContact}>
              Need Help
            </div>

          </div>
        </div>

        <NoteDialog show={this.state.showNote} close={this.closeNote.bind(this)} title={this.state.noteTitle} content={this.state.noteContent} showContact={this.props.showContact} />
      </div>
    );
  }
}

export default InputBox
