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

const UpdateCntDialog = ({id, date}) => {
  const { infoDialogOpen, setInfoDetailDialogOpen } = useContext(CommonContext);
  const {userDialogIndex, setUserDialogIndex} = useContext(CommonContext);
  const {rows, setRows} = useContext(CommonContext);

  // const [userDialogIndex, setUserDialogIndex] = useState(0);
  // const {userDialogIndex, setUserDialogIndex} = useState(0);
  // 여기서 바로 상태를 선언해주고 값을 바꿨을때는 왜 안됐을까?
  // setPlus is not a function => useState와 useContext: array, object 혼동X
  // const {plus, setPlus} = useState(0);
  const onClickInc = () => {
    date = date + 1;
    console.log(date);
    console.log(rows)
    console.log(id)
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
    console.log('here')
  }

  const openHandler = () => {
    setOpenForm(true);
    console.log(rows)
  };

  // item을 list화 시켜서 각 리스트 태그로 호출
  const {foodItem, expItem} = useContext(CommonContext);
  const foodList = foodItem.map( foodItem => <li>{foodItem}</li>)
  const expList = expItem.map( expItem => <li>{expItem}</li>)


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
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell onClick={onClickHandler}>{row.date}일</TableCell>
              {/* 문제의 부분 */}
                <UpdateCntDialog id={row.id} date={row.date}/>
              <TableCell align="right">
                <Button color="secondary">
                  <DeleteOutlinedIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <FoodAdd />
    </React.Fragment>
  );
}

export default FoodItem;