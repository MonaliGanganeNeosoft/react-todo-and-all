import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css"
import { Button, Col, Container, Row, Card} from "react-bootstrap";
import Compare from "../Compare/Compare";
import Cards from "../Cards/Cards";

const Search = () => {
  const navigate = useNavigate()

  const [name, setName] = useState(null);
  const [storeData, setStoreData] = useState([]);
  const [compareData, setCompareData] = useState([]);
  const isCompare = compareData.length > 4 ;

  const handleSearch = async (e) => {
    setName(e.target.value)
    
    await axios.get(`https://www.superheroapi.com/api.php/102543702625728/search/${name}`)
    .then((res)=> setStoreData(res.data.results))
    .catch((err)=> console.log(err))
  }

  const handleData = (id) => {
    const selectedData = storeData.find(item => item.id === id)
    
    document.getElementById(id).className = "selectedCard"

    compareData.push(selectedData)
    setCompareData([...compareData])
    localStorage.setItem("compareHeros", JSON.stringify(compareData))
  }

  const handleCompareData = () => {
      navigate("/compare")
      return(
        <Compare/>
      )
  }

  return (
    <>
     <Container>
          <Card className="py-4 card">
            <div>
                <h2>Super Hero's</h2>
            </div>
            <div className="mt-2">
                <input type="text" name="hero" onChange={(e)=> handleSearch(e)}/>
                <Button className="ml-3 px-3 py-1" onClick={handleSearch}>Search</Button>
           
                <Button variant="success" 
                  className="ml-3 px-3 py-1" 
                  onClick={handleCompareData}
                  disabled={!isCompare}
                >
                Compare Superheros</Button>
            </div>
          </Card>
            <Row>
                <Cards storeData={storeData} handleData={handleData}/>
            </Row>
      </Container>
    </>
  );
};

export default Search;
