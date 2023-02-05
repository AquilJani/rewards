import {useState, useEffect} from 'react';
import axios from 'axios';

import './App.css';

function Rewards() {
    const [transcations, setTranscations] = useState([]);
  
    useEffect(() => {
        const loadTransactions = async () => {
  
            let url = "./transactions.json";
            const response = await axios.get(url);
            console.log(response.data);
           setTranscations(response.data);
        }
  
        loadTransactions();
    }, []);

    const getPoints = (amount) => {

      let points = 0;
      if(amount > 50){
        points += 1 * 50;
      }

      if(amount > 100){
          const noOfPoints =  Math.floor(parseInt((amount/100)));
          points += (noOfPoints * 2) * (amount - (noOfPoints*100));
      }

      return points;
    }

  return (
    <div className="Rewards">
      {
        transcations.map((tr) => 
        {
          return (
          <>
          <h2>{tr.customerName}</h2> 
          
            <table border="1" align="center" width="500px">
              <tr>
                <td>Transcation Id</td>
                <td>Amount</td>
                <td>Date</td>
                <td>Reward Points</td>
              </tr>
              {
                tr.transctions.map((t) => {

                  return (<tr>
                      <td>{t.id}</td>
                      <td>${t.amount}</td>
                      <td>{t.date}</td>
                      <td>{getPoints(t.amount)}</td>
                    </tr>)
                })
              }
            </table>
            </>
          )
        })
      }
      
    </div>
  );
}

export default Rewards;
