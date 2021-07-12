import React,{useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from '@material-ui/icons/Add';
import Modali, { useModali } from 'modali';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import {withRouter} from 'react-router';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function Selection() {
  // console.log("gfhfj")
  const classes = useStyles();
  let count=0
  let items=[];
  let error=0
  const [value,setValue]=React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [addopen, setAddopen] = React.useState(false);
  const [dict,setDict]=React.useState([])
  const [modalivalue,setModalivalue]=React.useState(0)
  const [completeExample, toggleCompleteModal] = useModali({
    value:{modalivalue},
    animated: true,
    centered:true,
    title: 'Expired!',
    message: 'The fruit has expired.Delete the Fruit from the machine.',
    buttons: [  
      <Modali.Button
        label="Delete"
        isStyleDestructive
        onClick={() => Delete(modalivalue)}
      />,
    ],
  });
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    fetch([url], {
      method: "GET"
    },{ signal: signal })
      .then((response) => response.json())
      .then((response) => {
        setValue(response);
          (response.map(val=>{
            if(val.lifetime==0){
              setModalivalue(val.id)
              toggleCompleteModal()
           }
           else if(val.lifetime<0||val.quantity<=0||val.calories<=0||val.cost<=0){
             Delete(val.id)
           }
          }))
      })
      .catch((err) => {
         console.log("error", err);
      });
      return function cleanup() {
        abortController.abort();
      };
  }, [])

  const handleClickOpen = (eid,data) => {
    setDict(data)
    setOpen(true);
    setForm({...form,id:eid})
  };
  const handleClickAdd = () => {
    setAddopen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAddClose = () => {
    setAddopen(false);
  };
  let interval = 1000*60*1400; 

  let ajax_call = function() 
  {
    let newlife=0
    let len=value.length
    console.log("len",len)
    if(count==0&&len>0)
    {
       (Object.entries(value).map((items) => {
          len=len-1
          console.log("ajax",items[1],items[1].lifetime)
           newlife =items[1].lifetime-1
          console.log("newlifw",newlife)
            items[1].lifetime = newlife;
            Update(items[1])
           if(items[1].lifetime<=0){
             setModalivalue(items[1].id)
             toggleCompleteModal()
          }
    }))  
    count=1
    }
    if(len==0){
      clearTimeout(interval);
    }
  };

  setTimeout(ajax_call, interval);

  const [form, setForm] = React.useState([]);
  const url="http://localhost:8080/api/machine"


  const Update=(editval)=>{
    handleClose()
    fetch([url],{
      method:"PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editval)   
    })           
    .then((response)=>{
      setInterval("location.reload(true)", 6000);
    })
    .catch((err) => {
    });
  }

  const Delete=(id)=>{
    let newurl=url+"/"+id
    fetch([newurl],{
      method:"DELETE"
    })           
    .then((response)=>{
      setInterval("location.reload(true)", 2000);
    })
    .catch((err) => {
    });
  }
  const Add=(form)=>{
    document.getElementById('add_error').innerHTML = '';
    document.getElementById('quan_error').innerHTML = '';
    document.getElementById('cal_error').innerHTML = '';
    document.getElementById('lif_error').innerHTML = '';
    document.getElementById('cost_error').innerHTML = '';
    handleAddClose()
    setOpen(false);
        var quan_error=document.getElementById('quantity').value
        var cal_error=document.getElementById('calories').value
        var lif_error=document.getElementById('lifetime').value
        var cost_error=document.getElementById('cost').value
          if(quan_error<=0&&quan_error!=null){
            error++;
            document.getElementById('quan_error').innerHTML = 'Quantity cannot be zero or less';
            setInterval("location.reload(true)", 8000);
          }
          else if(cal_error<=0&&cal_error!=null){
            error++;
            document.getElementById('cal_error').innerHTML = 'Calories cannot be zero or less';
            setInterval("location.reload(true)", 8000);
          }
          else if(lif_error<=0&&lif_error!=null){
            error++;
            document.getElementById('lif_error').innerHTML = 'Shelf life has to be more ';
            setInterval("location.reload(true)", 8000);
          }
          else if(cost_error<=0&&cost_error!=null){
            error++;
            document.getElementById('cost_error').innerHTML = 'Amount is not as expected';
            setInterval("location.reload(true)", 8000);
          }
          else{
            fetch([url],{
                method:"POST",
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            })           
            .then((response)=>{
              setInterval("location.reload(true)", 2000);
              })
              .catch((err) => {
              });
            error++;
            document.getElementById('add_error').innerHTML = 'Fruit has been added successfully';
            }
      
    }
    const useSortableData = (newitems, config = null) => {
      const [sortConfig, setSortConfig] = React.useState(config);
    
      const sortedItems = React.useMemo(() => {
        let sortableItems = [...newitems];
        if (sortConfig !== null) {
          sortableItems.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
              return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
              return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
          });
        }
        return sortableItems;
      }, [newitems, sortConfig]);
    
      const requestSort = (key) => {
        let direction = 'ascending';
        if (
          sortConfig &&
          sortConfig.key === key &&
          sortConfig.direction === 'ascending'
        ) {
          direction = 'descending';
        }
        setSortConfig({ key, direction });
      };
    
      return { newitems: sortedItems, requestSort, sortConfig };
    };
    const ProductTable = (value) => {
      const { newitems, requestSort, sortConfig } = useSortableData(value);
      const getClassNamesFor = (name) => {
        if (!sortConfig) {
          return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
      }
      
   return (
    <div>
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="xs">
          <Typography component="div" style={{ backgroundColor: '#fafafa', height: '17vh' }} />
        </Container>
      </React.Fragment>
      <div className="app" >
      <Modali.Modal  {...completeExample}/>
      </div>
      <TableContainer component={Paper}>
      <caption>Products</caption>
      
        <Table className={classes.table} aria-label="simple table">
          <TableHead style={{fontstyle:"italic"}}>
            <TableRow>
              <TableCell align="right"><button
              style={{color:"#3c9c97"}}
              type="button"
              onClick={() => requestSort('name')}
              className={getClassNamesFor('name')}
            >Name</button></TableCell>
              <TableCell align="right"><button
              style={{color:"#3c9c97"}}
              type="button"
              onClick={() => requestSort('quantity')}
              className={getClassNamesFor('quantity')}
            >Quantity</button></TableCell>
              <TableCell align="right"><button
              style={{color:"#3c9c97"}}
              type="button"
              onClick={() => requestSort('calories')}
              className={getClassNamesFor('calories')}
            >Calories(cals)</button></TableCell>
              <TableCell align="right"><button
              style={{color:"#3c9c97"}}
              type="button"
              onClick={() => requestSort('lifetime')}
              className={getClassNamesFor('lifetime')}
            >Shelf life(days)</button></TableCell>
              <TableCell align="right"><button
              style={{color:"#3c9c97"}}
              type="button"
              onClick={() => requestSort('cost')}
              className={getClassNamesFor('cost')}
            >Cost(kg)</button></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
        {Object.entries(newitems).map(data=>{
                return(
                <TableRow className={classes.table}>
                  <TableCell style={{color:"#3c9c97"}} align="right">{data[1].name}</TableCell>
                  <TableCell style={{color:"#3c9c97"}} align="right">{data[1].quantity}</TableCell>
                  <TableCell style={{color:"#3c9c97"}} align="right">{data[1].calories}</TableCell>
                  <TableCell style={{color:"#3c9c97"}} align="right">{data[1].lifetime}</TableCell>
                  <TableCell style={{color:"#3c9c97"}} align="right">{data[1].cost}</TableCell> 
                  <Button style={{color:"#3c9c97"}} onClick={()=>handleClickOpen(data[1].id,data[1])} ><TableCell align="right" variant="contained" color="primary" >edit</TableCell></Button>
                  <Button style={{color:"#3c9c97"}} onClick={()=>Delete(data[1].id)}><TableCell align="right" variant="contained" color="primary">Delete</TableCell></Button>
                </TableRow>
                )
          })}
        </TableBody>
      </Table>
    </TableContainer>
    <div align="center">
      <Button style={{color:"#3c9c97"}} onClick={handleClickAdd} >< AddIcon/>Add</Button>
        <span class="error" style={{color:"red"}}><p id="add_error"></p></span>
        <span class="error" style={{color:"red"}}><p id="cal_error"></p></span>
        <span class="error" style={{color:"red"}}><p id="quan_error"></p></span>
        <span class="error" style={{color:"red"}}><p id="lif_error"></p></span>
        <span class="error" style={{color:"red"}}><p id="cost_error"></p></span>
    </div>
      <Dialog
          open={addopen}
          onClose={handleAddClose}
          aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" />
        <DialogContent>
          <TextField
            style={{color:"#3c9c97"}}
            autoFocus
            margin="dense"
            id="name"
            label="name" 
            fullWidth
              onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <TextField
            style={{color:"#3c9c97"}}
            autoFocus
            margin="dense"
            id="quantity"
            label="quantity"
            type="number"
            fullWidth 
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          />       
          <TextField
            style={{color:"#3c9c97"}}
            autoFocus
            margin="dense"
            id="calories"
            label="calories"
            fullWidth
              onChange={(e) => setForm({ ...form, calories: e.target.value })}
          />
          <TextField
            style={{color:"#3c9c97"}}
            autoFocus
            margin="dense"
            id="lifetime"
            label="Shelf time"
            type="number"
            fullWidth
              onChange={(e) => setForm({ ...form, lifetime: e.target.value })}
          />
          <TextField
            style={{color:"#3c9c97"}}
            autoFocus
            margin="dense"
            id="cost"
            label="cost"
            type="number"
            fullWidth
              onChange={(e) => setForm({ ...form, cost: e.target.value })}
          />
            
        </DialogContent>
      <DialogActions>
        <Button style={{color:"#3c9c97"}} onClick={handleAddClose} color="primary">
          Cancel
        </Button>
        <Button style={{color:"#3c9c97"}} onClick={()=>Add(form)} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title" />
      <DialogContent>
        <TextField
          style={{color:"#3c9c97"}}
          autoFocus
          margin="dense"
          id="name"
          label="name"
          placeholder={dict.name} 
          fullWidth
            onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <TextField
          style={{color:"#3c9c97"}}
          autoFocus
          margin="dense"
          id="quantity"
          label="quantity"
          type="number"
          placeholder={dict.quantity}
          fullWidth 
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
        />
        <TextField
          style={{color:"#3c9c97"}}
          autoFocus
          margin="dense"
          id="calories"
          label="calories"
          type="number"
          placeholder={dict.calories}
          fullWidth
            onChange={(e) => setForm({ ...form, calories: e.target.value })}
        />
        <TextField
          style={{color:"#3c9c97"}}
          autoFocus
          margin="dense"
          id="lifetime"
          label="Shelf time"
          type="number"
          placeholder={dict.lifetime}
          fullWidth
            onChange={(e) => setForm({ ...form, lifetime: e.target.value })}
        />
        <TextField
          style={{color:"#3c9c97"}}
          autoFocus
          margin="dense"
          id="cost"
          label="cost"
          type="number"
          placeholder={dict.cost}
          fullWidth
            onChange={(e) => setForm({ ...form, cost: e.target.value })}
        />
        
        </DialogContent>
        <DialogActions>
          <Button style={{color:"#3c9c97"}} onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button style={{color:"#3c9c97"}} onClick={()=>Update(form)} color="primary">
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </div>)}


return(
  <div>
    {ProductTable(value)}
  </div>
)
}

export default withRouter(Selection)
 