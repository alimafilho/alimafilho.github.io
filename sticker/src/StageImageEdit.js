import React, { Component} from 'react'

import { Stage, Layer, Rect, Text, Image, Ellipse } from 'react-konva';
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
      draggable={false}
			x={55}
      y={35}
      />;
  }
  // render() {
  //   return <Image
  //     image={this.state.image} 
  //     draggable="false"
	// 		x={20}
  //     y={20}
  //     scale={{
  //       x : 2,
  //           y : 2
  //     }}
  //     />;
  // }
}

class StageImageEdit extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dataURL: null,
      fillText: '#c7ecee',
      fillBackground: '#c7ecee',
      listColorsBackground: ['#c7ecee', '#fab1a0', '#b8e994', '#f368e0']
    }
  }

  handleExportClick = () => {
    if (this.state.dataURL !== this.stageRef.getStage().toDataURL()) {
      this.setState({dataURL: this.stageRef.getStage().toDataURL()})
    }
  }

  setColorBackgrund (color) {
    if (this.state.fillBackground !== color) {
      this.setState({fillBackground: color, fillText: color})
    }
  }

  render () {

    if (!this.props.isOpen) {
      return (null)
    }
    return(
      <div>
        <Stage ref={node => { this.stageRef = node}} width={300} height={300}>
          <Layer>
            <Ellipse 
              x= {300 / 2}
              y= {300 / 2}
              width={290}
              height={290}
              radius= {70}
              fill= {this.state.fillBackground}
              />
            <Ellipse 
              x= {300 / 2}
              y= {300 / 2}
              width={280}
              height={280}
              radius= {70}
              stroke='#fff'
              strokeWidth={2}
              dash={[10,10]}
              strokeDasharray="10,10"
              />
            <AdocaoBrasilLogoImage />
            <Text 
              text={this.props.totalWeeks}
              x={10}
              y={125}
              width={290}
              height={50}
              fill={this.state.fillText}
              fontFamily="'Pacifico', cursive"
              fontSize={42}
              padding= {20}
              align= 'center'
              strokeXYZ= '#fff'
              strokeWidthXYZ= '0px'
            />
            <Text 
              text='Semanas de gestação'
              x={10}
              y={210}
              width={290}
              height={50}
              fill='#fff'
              fontFamily="'Pacifico', cursive"
              fontSize={20}
              padding= {20}
              align= 'center'
          />
          </Layer>
        </Stage>

        <div>
          <span class="stage-legend">Selecione uma cor para o fundo:</span>
          <ul class="list-items">
          {
            this.state.listColorsBackground.map((color, index) => {
              return(
                <li key={index}>
                  <div onClick={() => {this.setColorBackgrund(color)}} style={{position: 'relative', backgroundColor: color, borderRadius: '3px', width: '100%', height: '40px', marginRight: '10px'}} data-color={color}></div>
                </li>
              )
            })
          }
          </ul>
        </div>
        
        {(this.state.dataURL) && (
          <a class="button-download" href={this.state.dataURL} download="stage.png">Baixar imagem</a>
        )}
        <div style={{display: 'none'}}>
          {setTimeout(() => {this.handleExportClick()}, 500)}
        </div>
      </div>
    )
  }
}

export default StageImageEdit