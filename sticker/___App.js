import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Stage, Layer, Rect, Text, Image } from 'react-konva';
import Konva from 'konva';


// VERY IMPORTANT NOTES
// at first we will set image state to null
// and then we will set it to native image instanse
// only when image is loaded
class AdocaoBrasilLogoImage extends React.Component {
  state = {
    image: null
  };
  componentDidMount() {
    const image = new window.Image();
    // image.src = "http://konvajs.github.io/assets/yoda.jpg";
    image.src = "adacao_brasil.png";
    image.onload = () => {
      // setState will redraw layer
      // because "image" property is changed
      this.setState({
        image: image
      });
    };
  }

  render() {
    return <Image
    		image={this.state.image} 
    		draggable="false"
			x={20}
	        y={20}
	        scale={{
	        	x : 2,
                y : 2
	        }}
    		 />;

  }
}

class App extends Component {

	constructor(props) {
		super(props)

		this.state = {
			valueDateOne: '1',
			dataURL: null
		}

		this.handleOnkeyupDateOne = this.handleOnkeyupDateOne.bind(this)
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

	handleOnkeyupDateOne (event) {
		console.log('e =>', event,  event.target.value)
		this.setState({valueDateOne: event.target.value})
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
							<input id="txtDate" type='text' placeholder='DATA PROCESSO' class='input-line full-width' value={this.state.valueDateOne} onChange={this.handleOnkeyupDateOne}></input>
							<input id="txtDate2" type='text' placeholder='DATA LIGAÇÃO ou DIA DE HOJE' class='input-line full-width'></input>
						</div>
						<div class='spacing'>Semanas de gestação <span class='highlight'><div class="highlightAB" id="semanasAB"></div></span></div>
						<div>
							<button id="btnCalculate" class="ghost-round full-width" value="Calcular" onclick="CalculateWeek()">Calcular</button>
						</div>
						<div class='subtitle'>@2018 - <a href="https://www.adocaobrasil.com.br" target="_blank">Adoção Brasil</a>. Todos os direitos reservados.</div>
				</div>
				</div>
			</div>
      <Stage ref={node => { this.stageRef = node}} width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <AdocaoBrasilLogoImage />
          <Text 
          	text='44'
          	x={0}
	        y={70}
	        width={300}
	        height={50}
	        fill="green"
	        fontFamily="'Pacifico', cursive"
	        fontSize={18}
	        padding= {20}
      		align= 'center'
	       />
          <Text 
          	text='Semanas de gestação'
          	x={0}
	        y={100}
	        width={300}
	        height={50}
	        fill="green"
	        fontFamily="'Pacifico', cursive"
	        fontSize={14}
	        padding= {20}
      		align= 'center'
	       />
        </Layer>
      </Stage>
      <button style={{ position: 'absolute', top: '0'}} onClick={this.handleExportClick}>Export stage</button>
     
		{(this.state.dataURL !== null) && (
			<div>
			<a href={`"${this.state.dataURL}"`} download="stage.png">dwnl</a>
			<img src={this.state.dataURL} />
			{() => {
				setTimeout(() => {console.log('OK'); const el = document.querySelector('a'); el.click()}, 2000)
			}}
			</div>
		)}
     </div>
    );
  }
}

export default App;
