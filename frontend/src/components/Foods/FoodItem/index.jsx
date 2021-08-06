import React, {useContext,useState} from 'react';
import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles,
  
  Button,
  Grid,
  Dialog,
  DialogTitle,
  Icon,
  } from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

import FoodAdd from '../FoodAdd';
import { CommonContext } from '../../../context/CommonContext';
import { CompareSharp } from '@material-ui/icons';

const UpdateCntDialog = ({id, date}) => {
  const { infoDialogOpen, setInfoDetailDialogOpen } = useContext(CommonContext);
  const {rows, setRows} = useContext(CommonContext);
  const { exp, setExp } = useContext(CommonContext)
// console.log(exp, 'exp:fooditem');
// console.log(setExp, 'setExp')
  // const [userDialogIndex, setUserDialogIndex] = useState(0);
  // const {userDialogIndex, setUserDialogIndex} = useState(0);
  // 여기서 바로 상태를 선언해주고 값을 바꿨을때는 왜 안됐을까?
  // setPlus is not a function => useState와 useContext: array, object 혼동X
  // const {plus, setPlus} = useState(0);
  const onClickInc = () => {
    setExp(exp + 1);
  };

  const onClickDec = () => {
    setExp(exp - 1);
  };

  // Dialog를 닫는 Handler
  const onCloseHandler = () => {
    setInfoDetailDialogOpen(false);
    console.log('DialogClose')
  };

  return (
    <Dialog
      open={infoDialogOpen}
      onClose={onCloseHandler}
      aria-labelledby="max-width-dialog-title"
      PaperProps={{
        style: {
          height: '20vh',
          padding: '10px',
          width: '500px',
          maxWidth: 'none',
          overflowX: 'hidden',
          overflowY: 'auto',
          position: 'inherit',
        },
      }}
    >
      <DialogTitle>
        유통기한 변경
      </DialogTitle>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Button onClick={ onClickDec }>
            -
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button>
            {exp}일
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button onClick={ onClickInc }>
            +
          </Button>
        </Grid>
      </Grid>
    </Dialog>
  );
};


// Generate Order Data
function createData(id, date, name) {
  return { id, date, name };
}
// const rows = [
//   createData(0, 5, 'Dummy1'),
//   createData(1, 4, 'Dummy2'),
//   createData(2, 9, 'Dummy3'),
// ];
// const [rows, setRows] = useState()

const FoodItem = () => {
  const {rows, setRows} = useContext(CommonContext);

  // Dialog
  const { setInfoDetailDialogOpen } = useContext(CommonContext);
  const { setOpenForm } = useContext(CommonContext);
  const { exp, setExp } = useContext(CommonContext)

  const onClickHandler = (params) => {
    setInfoDetailDialogOpen(true);
    // console.log(rows[i].date)
    setExp(params);
    console.log(exp, 'onclickHandler');
    // console.log(params.target.innerHTML, 'paramskk');
    console.log('DialogOpen');
  };

  const openHandler = () => {
    setOpenForm(true);
    // console.log(rows)
  };

  const foodList = () => {
    const res = [];
    
    for (let i = 0; i < rows.length; i++) {
      let rowSty = { }
      if (rows[i].date <= 0) {
        rowSty = {
          background : 'red',
        }
      }
      res.push( 
      <TableRow style ={rowSty}>
        <TableCell> {rows[i].id} </TableCell>
        <TableCell onClick={() => {onClickHandler(rows[i].date)}}>
          {rows[i].date}일
        </TableCell>
        <TableCell align="right">
          <Button color="secondary">
            <DeleteOutlinedIcon />
          </Button>
        </TableCell>
      </TableRow>
      )
    };
    <UpdateCntDialog />
    return res;
  }


  return (
    <React.Fragment>
      {/* <Title>Recent Orders</Title> */}
      <Table size="large">
        <TableHead>
          <TableRow>
            <TableCell>식재료</TableCell>
            <TableCell>유통기한</TableCell>
            <TableCell align="right">
              <Button onClick={openHandler}>
               <Icon color="primary">add_circle</Icon>
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>

        
        {/* <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell onClick={onClickHandler}>{row.date}일</TableCell>
              <UpdateCntDialog id={row.id} date={row.date}/>
              문제의 부분
              <TableCell align="right">
                <Button color="secondary">
                  <DeleteOutlinedIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <h2>for문</h2> */}
          {foodList()}
        {/* <button onClick={()=>console.log(array())}>btn</button> */}
        <UpdateCntDialog />
      </Table>

      <FoodAdd />
    </React.Fragment>
  );
}

export default FoodItem;