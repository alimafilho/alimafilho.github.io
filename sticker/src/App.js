import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import StageImageEdit from './StageImageEdit'
import Modal from 'react-modal'




const customStyles = {
  overlay: {
    zIndex: 999,
    backgroundColor: 'rgba(0,0,0,0.8)'
  },
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    maxWidth: '360px',
    height: '100%',
    maxHeight: '560px',
    padding: '10px'
  }
}

class App extends Component {

	constructor(props) {
		super(props)

		this.state = {
      modalIsOpen: false,
      valueDateProcesso: '',
      valueDateLigacao: '',
      totalWeeks: null,
			dataURL: null
		}

    this.handleDateProcess = this.handleDateProcess.bind(this)
    this.handleDataLigacao = this.handleDataLigacao.bind(this)
    this.calculateWeek = this.calculateWeek.bind(this)

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
	}
  componentDidMount() {
    // log stage react wrapper
    // console.log(this.stageRef.stage);
    // // log Konva.Stage instance
    // console.log(this.stageRef.stage.getStage());
    // console.log(this.stageRef.stage.getStage().content);
  }

  handleExportClick = () => {
    console.log(this.stageRef.getStage().toDataURL());
    this.setState({dataURL: this.stageRef.getStage().toDataURL()})
  }

  dateFormatter (value) {
    let v = value
    if (v.match(/^\d{2}$/) !== null) {
      v = v + '/'
    } else if (v.match(/^\d{2}\/\d{2}$/) !== null) {
      v = v + '/'
    }
    return v.substring(0, 10)
  }
	handleDateProcess (event) {
    let v = this.dateFormatter(event.target.value)
		this.setState({
      valueDateProcesso: v
    })
  }
  
  handleDataLigacao (event) {
    let v = this.dateFormatter(event.target.value)
		this.setState({
      valueDateLigacao: v
    })
  }

  calculateWeek () {
    const  arrDateValueEnd = this.state.valueDateLigacao.split('/')
    const DateInit = new Date(arrDateValueEnd[1] + '/' + arrDateValueEnd[0] + '/' + arrDateValueEnd[2])

    const arrDateValueInit = this.state.valueDateProcesso.split('/')
    const DateEnd = new Date(arrDateValueInit[1] + '/' + arrDateValueInit[0] + '/' + arrDateValueInit[2])

    const perWeek = 24 * 60 * 60 * 1000 * 7
    const totalWeeks = Math.round((DateInit.valueOf() - DateEnd.valueOf())/ perWeek) + 1

    this.setState({
      totalWeeks: totalWeeks
    })
  }

  // Modal
  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    return (
    <div>
      <div class='bold-line'></div>
      <div class='container'>
        <div class='window'>
          <div class='overlay'></div>
          <div class='content'>
            <div class='welcome'><img src="AdocaoBrasil_Logo.png" />&nbsp;SEMANAS</div>
            <div class='subtitle'>Informe o dia que entrou no processo e o dia em que recebeu a tão esperada ligação</div>
            <div class='input-fields'>
              <input type='text' placeholder='DATA PROCESSO' class='input-line full-width' value={this.state.valueDateProcesso} onChange={this.handleDateProcess}></input>
              <input type='text' placeholder='DATA LIGAÇÃO ou DIA DE HOJE' class='input-line full-width' value={this.state.valueDateLigacao} onChange={this.handleDataLigacao}></input>
            </div>
            <div class='spacing'>
              Semanas de gestação 
              <span class='highlight'>
                <div class="highlightAB" id="semanasAB">{(this.state.totalWeeks) && (this.state.totalWeeks)}</div>
              </span>
            </div>
            <div class="group-button">
              <button class="ghost-round full-width" onClick={this.calculateWeek}>Calcular</button>
              <button class="ghost-round full-width" onClick={() => {
                if (this.state.totalWeeks) {
                  this.openModal()
                }
              }}>Visualizar</button>
            </div>
            <div class='subtitle'>@2018 - <a href="https://www.adocaobrasil.com.br" target="_blank">Adoção Brasil</a>. Todos os direitos reservados.</div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel="AB Modal"
      >
        <button class="button-back" onClick={this.closeModal}>Voltar</button>
        <div>
          <StageImageEdit totalWeeks={this.state.totalWeeks} isOpen={this.state.modalIsOpen}/>
        </div>
      </Modal>
    </div>
    );
  }
}

export default App;
