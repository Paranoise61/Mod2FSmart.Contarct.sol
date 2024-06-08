import { useState } from "react";

export default function CaloriesCalculator() {
    const [calories, setCalories] = useState(undefined);
    const [cups, setCups] = useState("");
    const CALORIES_PER_CUP = 140;
    const [walletAddress, setWalletAddress] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); 

    const updateCalories = () => {
      if(walletAddress != ""){
        if (cups !== "") {
              const cupsInt = parseInt(cups, 10);
              if (!isNaN(cupsInt)) {
                  const totalCalories = cupsInt * CALORIES_PER_CUP;
                  setCalories(totalCalories);
              }
          }
      }
      else{
        setErrorMessage('You can\'t proceed, Connect your Metamask first.');
      }    
};

    const resetCalories = () => {
        setCalories(undefined);
        setCups("");
    };

    const connectToMetaMask = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
            setErrorMessage("");
          } else {
            setErrorMessage('Unsuccessful connecting....');
          }
          
        } catch (error) {
          console.error('Error connecting to MetaMask:', error);
        }
      } else {
        setErrorMessage('MetaMask is not installed. Please install MetaMask to use this feature.');
      }
    };

    return (
        <div className="container">
            <h1>Count Your Calories</h1>
            <div className="calculator">

            <div className="connect">
              <br/><button onClick={connectToMetaMask}>🦊</button>
            </div>

                <label>Cups of Coke:</label>
                <input 
                    type="text" 
                    value={cups} 
                    onChange={(e) => setCups(e.target.value)} 
                    placeholder="Enter number of cups" 
                />
                <div className="button-group">
                    <button onClick={updateCalories}>Calculate</button>
                    <button onClick={resetCalories}>Reset</button>
                </div>
                <label>Total Calories:</label>
                <div className="output">{calories !== undefined ? calories : "--"}</div><br />
            
            {walletAddress && (
            <div>
              <label className="address">Wallet Address:</label><br/>
              <label className="address">{walletAddress}</label>
            </div>
            )}
              {errorMessage && <label className="error">{errorMessage}</label>}
            </div>
            
            <style jsx>{`
                .container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    background-color: #f0f0f0;
                    font-family: Arial, sans-serif;
                    text-align: center;
                }

                .connect{
                  margin-left: -220pt;     
                  margin-top: -25pt;            
                }

                .error{
                  font-size: 15px;
                  text-decoration: underline;
                  color: red;
                }

                .address{
                  font-size: 15px;
                }
                h1 {
                    margin-bottom: 20px;
                    font-size: 24px;
                    color: #333;
                }
                .calculator {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    background-color: #fff;
                    padding: 30px;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    width: 300px;
                }
                label {
                    margin: 10px 0;
                    font-size: 18px;
                    color: #555;
                }
                input {
                    text-align: center;
                    border: 2px solid #ccc;
                    border-radius: 5px;
                    padding: 10px;
                    width: 100%;
                    margin-bottom: 20px;
                    font-size: 16px;
                    box-sizing: border-box;
                }
                .button-group {
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                }
                button {
                    flex: 1;
                    margin: 5px;
                    padding: 10px;
                    border: none;
                    border-radius: 5px;
                    background-color: #007bff;
                    color: white;
                    cursor: pointer;
                    font-size: 16px;
                    transition: background-color 0.3s ease;
                }
                button:hover {
                    background-color: #0056b3;
                }
                .output {
                    margin-top: 20px;
                    font-size: 20px;
                    font-weight: bold;
                    color: #333;
                    text-align: center;
                }
            `}</style>
        </div>
    );
}
