import React, {useContext} from 'react';
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
  const {userDialogIndex, setUserDialogIndex} = useContext(CommonContext);
  const {rows, setRows} = useContext(CommonContext);
console.log(id, date);
  // const [userDialogIndex, setUserDialogIndex] = useState(0);
  // const {userDialogIndex, setUserDialogIndex} = useState(0);
  // 여기서 바로 상태를 선언해주고 값을 바꿨을때는 왜 안됐을까?
  // setPlus is not a function => useState와 useContext: array, object 혼동X
  // const {plus, setPlus} = useState(0);
  const onClickInc = () => {
    date = date + 1;
  };

  const onClickDec = () => {
    setUserDialogIndex((date - 1));
    console.log(userDialogIndex);
  };

  // Dialog를 닫는 Handler
  const onCloseHandler = () => {
    setInfoDetailDialogOpen(false);
    console.log(infoDialogOpen);
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
            {date}일
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button onClick={ onClickInc }>
            +
          </Button>
        </Grid>
      </Grid>
      <button onClick={()=>{console.log(date)}}>button</button>
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
  const { userDialogIndex } = useContext(CommonContext);
  const { setOpenForm } = useContext(CommonContext);

  const onClickHandler = () => {
    setInfoDetailDialogOpen(true);
    // console.log(rows[i].date)
    console.log('DialogOpen')
  };

  const openHandler = () => {
    setOpenForm(true);
    console.log(rows)
  };

  const array = () => {
    const res = [];
    
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].date <= 0) {
        const rowSty = {
          background : 'red',
        }
        res.push( 
          <TableRow style ={rowSty}>
            <TableCell> {rows[i].id} </TableCell>
            <TableCell 
              onClick={onClickHandler}
            >
              {rows[i].date}일
            </TableCell>
            {/* <UpdateCntDialog date={rows[i].date}/> */}
          </TableRow>
          )
      }
      else{
        const rowSty = {
          background : 'blue',
        }
        res.push( 
        <TableRow style ={rowSty}>
          <TableCell> {rows[i].id} </TableCell>
          <TableCell 
            onClick={onClickHandler}
          >
            {rows[i].date}일
          </TableCell>
          {/* <UpdateCntDialog date={rows[i].date}/> */}
        </TableRow>
        )
      }
    };
    return res
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

        {/*  */}
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell onClick={onClickHandler}>{row.date}일</TableCell>
              {/* 문제의 부분 */}
              <TableCell align="right">
                <Button color="secondary">
                  <DeleteOutlinedIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
          <UpdateCntDialog id={10} date={5}/>
        <h2>for문</h2>
          {array()}
        {/* <button onClick={()=>console.log(array())}>btn</button> */}
      </Table>

      <FoodAdd />
    </React.Fragment>
  );
}

export default FoodItem;