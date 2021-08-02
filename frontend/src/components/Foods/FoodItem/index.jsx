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
  } from '@material-ui/core';
import { CommonContext } from '../../../context/CommonContext';

const UpdateCntDialog = () => {
  const { infoDialogOpen, setInfoDetailDialogOpen } = useContext(CommonContext);
  const {userDialogIndex, setUserDialogIndex} = useContext(CommonContext);
  // const [userDialogIndex, setUserDialogIndex] = useState(0);
  // const {userDialogIndex, setUserDialogIndex} = useState(0);
  // 여기서 바로 상태를 선언해주고 값을 바꿨을때는 왜 안됐을까?
  // setPlus is not a function => useState와 useContext: array, object 혼동X
  // const {plus, setPlus} = useState(0);
  const onClickInc = () => {
    setUserDialogIndex((userDialogIndex + 1));
    console.log(userDialogIndex);
  };

  const onClickDec = () => {
    setUserDialogIndex((userDialogIndex - 1));
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
        수량변경
      </DialogTitle>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Button onClick={ onClickDec }>
              -
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button>
              {userDialogIndex}개
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

const rows = [
  createData(0, '16 Mar, 2019', 'Elvis Presley'),
  createData(1, '16 Mar, 2019', 'Paul McCartney'),
  createData(2, '16 Mar, 2019', 'Tom Scholz'),
  createData(3, '16 Mar, 2019', 'Michael Jackson'),
  createData(4, '15 Mar, 2019', 'Bruce Springsteen'),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const FoodItem = () => {
  const classes = useStyles();

  // Dialog
  const { setInfoDetailDialogOpen } = useContext(CommonContext);
  const { userDialogIndex } = useContext(CommonContext);

  const onClickHandler = () => {
    setInfoDetailDialogOpen(true);
    console.log('here')
  }
  // item을 list화 시켜서 각 리스트 태그로 호출
  const {foodItem, expItem} = useContext(CommonContext);
  const foodList = foodItem.map( foodItem => <li>{foodItem}</li>)
  // 하나의 리스트로 한번에 호출하기
  // ** btn태그로 감싸주면 리스트화가 안됨
  const expList = expItem.map( expItem => <li>{expItem}</li>)


  return (
    <React.Fragment>
      {/* <Title>Recent Orders</Title> */}
      <Table size="large">
        <TableHead>
          <TableRow>
            <TableCell>식재료</TableCell>
            <TableCell>유통기한</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell onClick={onClickHandler}>{row.date}</TableCell>
              <TableCell align="right">
                <Button color="secondary">삭제</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
      <UpdateCntDialog />
    </React.Fragment>
  );
}

export default FoodItem;