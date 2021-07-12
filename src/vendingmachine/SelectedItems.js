import React, { useState,useEffect } from 'react';
import Table from '@material-ui/core/Table';
import { makeStyles} from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function SelectedItems(items) {
     console.log('items.totalMoney')
    let array = []
    const classes = useStyles()
    const [editValue,setEditValue]=useState()
    const [val, setVal] = useState([items]);
    let [totcost]=useState(0)
    let [total, set_total] = useState(0);
    let [totaltoshow, set_totaltoshow] = useState(0);

    const set_sum = (value) => {
    total += value;
    set_total(total)
  }
  const reset=()=>{
    set_total(0)
  }
  const url="http://localhost:8080/api/machine"
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    fetch([url], {
      method: "GET"
    },{ signal: signal })
      .then((response) => response.json())
      .then((response) => {
        setEditValue(response);
      })
      .catch((err) => {
         console.log("error", err);
      });
      return function cleanup() {
        abortController.abort();
      };
  }, [])

  const Update=(editval)=>{
    console.log("update----",editval)
    fetch([url],{
      method:"PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editval)   
    })           
    .then((response)=>{
      setInterval("location.reload(true)", 4000);
    })
    .catch((err) => {
       console.log("error", err);
    });
  }

  const totalmoney = (value) => {
    set_sum(value)
  }
  const calc_total=(cost)=>{
    totaltoshow+=parseInt(cost) 
    console.log("totaltoshow",totaltoshow)
    set_totaltoshow(totaltoshow)
  }
  const edit=()=>{
       (Object.entries(editValue).map(ed => {
          (Object.entries(val).map(data => {
            (data).map(item => {
                (Object.values(item)).map(newi => {
                    (Object.values(newi).map(check => {
                      if(ed[1].name===check.name&&check.quantity!=undefined){
                        check.quantity=ed[1].quantity-check.quantity
                        Update(check)
                      }
                      
                    }))
                })
            })
        }))
       }) )
  }
    const pay=(finalTotal)=>{
    console.log('pay', total, finalTotal)
    if(total==finalTotal){
      alert("pickup your order")
    edit()
    }
    else if(total<finalTotal){
      alert("Pay the correct amount.Your amount is less")
      reset()
    }
    else if (total>finalTotal){
      alert("Pay the correct amount.Your amount exceeds")
      reset()
    }
  }
    return (
    <div> 
        <React.Fragment>
        <CssBaseline />
        <Container maxWidth="xs">
          <Typography component="div" style={{ backgroundColor: '#fafafa', height: '21vh' }} />
        </Container>
      </React.Fragment>
        {
          (Object.entries(val).map(data => {
                (data).map(item => {
                    (Object.values(item)).map(newi => {
                        (Object.values(newi).map(check => {
                            array.push(check) 
                        }))
                    })
                })
            }))
        } 
        {
          (Object.entries(val).map(data => {
                (data).map(item => {
                    (Object.values(item)).map(newi => {
                        (Object.values(newi).map(check => { 
                                {console.log("val,",check)}
                                if(check.quantity>=0){
                                totcost+=(check.quantity*check.cost)
                                console.log("cost",totcost)
                                }
                        }))
                    })
                })
            }))
        }
    <TableContainer component={Paper} >
        <Table className={classes.table} aria-label="simple table" >
                <TableHead>
                    <TableRow >
                        <TableCell  align="left"> Name </TableCell>
                        <TableCell  align="left"> Quantity </TableCell>
                        <TableCell  align="left">Calories(cals)</TableCell>
                        <TableCell align="left" > Cost(kg)</TableCell>
                    </TableRow>    
                </TableHead>
            <TableBody> 
            {
            array.map(newar => {
                if (newar.id !== undefined) {
                    let cost = newar.quantity*newar.cost
                    return (
                    <TableRow className={classes.table} >
                        <TableCell align="left">{newar.name}</TableCell>
                        <TableCell align="left">{newar.quantity}</TableCell>
                        <TableCell align="left">{newar.calories}</TableCell>
                        <TableCell align="left">{cost}</TableCell> 
                    </TableRow>)}
                })
            }
            </TableBody>
        </Table >
        <div align="right">
        <TableCell align="right">Total:{totcost}</TableCell>
        </div>
    </TableContainer>
        
        <div><ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Pay</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            <Grid item>
              <h1 style={{color:"#9e9e9e"}}>Select rupees </h1>
              <button
                type="button"
                class="btn btn-default"
                onClick={() => totalmoney(10)}
              >
                {" "}
                ₹10{" "}
              </button>
              <button
                type="button"
                class="btn btn-default"
                onClick={() => totalmoney(20)}
              >
                {" "}
                ₹20{" "}
              </button>
              <button
                type="button"
                class="btn btn-default"
                onClick={() => totalmoney(100)}
              >
                {" "}
                ₹100{" "}
              </button>
              <button
                type="button"
                class="btn btn-default"
                onClick={() => totalmoney(500)}
              >
                {" "}
                ₹500{" "}
              </button>
              <button
                type="button"
                class="btn btn-default"
                onClick={() => totalmoney(2000)}
              >
                {" "}
                ₹2000{" "}
              </button>
            </Grid>
            <Grid item>
            <h1 style={{color:"#9e9e9e"}}>Select coin </h1> 
                <button type="button" class="btn btn-default"onClick={() => totalmoney(1)}> 1 </button> 
                <button type="button" class="btn btn-default" onClick={() => totalmoney(2)}> 2 </button> 
                <button type="button" class="btn btn-default" onClick={() => totalmoney(5)}> 5 </button>
            </Grid>
            <Grid item className="total-row">
                <input type="text" class="change-input form-control" readOnly value={total}/> 
                <button type="button" onClick={()=>{pay(totcost)}}>Pay</button>
                <button type="button" onClick={reset}>Reset</button>
            </Grid> 
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel></div>
    </div>
    )
}