import React, {Component} from 'react';


// 畫出贏家的線段
function Line(props) {

  const position = (index) => {
    return (index * 100 + 50)
  }

  return (
    <svg className='line'>
      <line
        x1={position(props.line.x1)}
        y1={position(props.line.y1)}
        x2={position(props.line.x2)}
        y2={position(props.line.y2)}
        style={{stroke:'red',strokeWidth:2}}/>
    </svg>
  )
}

// 九宮格的格子
function Cell(props) {
  const update = () => {
    props.update(props.index)
  }

  let mark = '';
  if (props.mark === 0) {
    mark = 'O';
  } else if (props.mark === 1) {
    mark = 'X';
  }

  return (
    <div className='cell' onClick={update}>
      {mark}
    </div>
  )
}

// 主要遊戲conponent
export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 遊戲陣列
      marks: [-1,-1,-1,-1,-1,-1,-1,-1,-1],
      // 贏家
      winner: null,
      // 第幾回合
      round: -1
    }
  }

  checkWinner(marks) {
    let winner = (
        this.cleckSameInMarks(marks, 0, 1, 2) 
        || this.cleckSameInMarks(marks, 3, 4, 5) 
        || this.cleckSameInMarks(marks, 6, 7, 8) 
        || this.cleckSameInMarks(marks, 0, 3, 6) 
        || this.cleckSameInMarks(marks, 1, 4, 5) 
        || this.cleckSameInMarks(marks, 2, 5, 8) 
        || this.cleckSameInMarks(marks, 0, 4, 8) 
        || this.cleckSameInMarks(marks, 2, 4, 6)
      )
    return winner
  }

  cleckSameInMarks(marks, i1, i2, i3) {
    if (marks[i1] != -1 && marks[i1] == marks[i2] && marks[i2] == marks[i3]) {
      return {
        player: marks[i1],
        line: {
          x1: i1 % 3,
          y1: Math.floor(i1 / 3),
          x2: i3 % 3,
          y2: Math.floor(i3 / 3)
        }
      }
    } else {
      return null;
    }
  }

  update(index) {

    // 收到來自cell的click事件，更新state
    this.setState((state, props) => {
      if (state.marks[index] == -1 && state.winner == null) {

        state.round += 1;
        state.marks[index] = state.round % 2;
        state.winner = this.checkWinner(state.marks);

        return {marks: state.marks, winner: state.winner, round: state.round}
      }
    });
  }

  render() {
    // for loop 加入九個宮格
    let cells = [];
    for (let i = 0; i < this.state.marks.length; i++) {
      cells.push(<Cell className='cell' mark={this.state.marks[i]} index={i} update={this.update.bind(this)} key={i}/>);
    }

    return (
      <div className='board'>
        {this.state.winner && <Line line={this.state.winner.line}/>}
        {cells}
      </div>
    )
  }
};
