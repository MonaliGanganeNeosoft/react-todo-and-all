import { useEffect, useState } from "react"
import { Col, Container, Row, Card, Button } from "react-bootstrap"
import "../SearchBar/Search.css"
import { useNavigate } from "react-router-dom";

const Compare = () => {
    const navigate = useNavigate()
    const [heroCompre, setHeroCompare] = useState([])
    const [hoverData, setHoverData] = useState([])
    const [highestValue, setHighestValue] = useState()
    const aryData = []

    useEffect( () => {
        const data = JSON.parse(localStorage.getItem("compareHeros"))
        setHeroCompare(data)

        if(hoverData.length){
            const sorts = hoverData.sort(function(a, b){return b - a});
            setHighestValue(sorts[0])
        }

    }, [hoverData])

    const handleBackSearch = () => {
        localStorage.removeItem("compareHeros")
        navigate("/")
    }

    const handleCompare = (item) => {
        const filter = heroCompre.map(vals => {
            if(item){
                const finalVal = vals.powerstats[item]
                aryData.push(finalVal)
                setHoverData([...aryData]) 
            }
        })       
    }

    const keys = ["name", "combat", "durability", "intelligence", "power", "speed", "strength"]
    
    return(
        <Container>

            <Card className="showValue">
                <Button variant="danger" onClick={handleBackSearch}>
                    Go Back to Search
                </Button>
            </Card>

            <Card className="showValue">
                <h3>Highest Value - {highestValue}</h3>
            </Card>

            <Row className="compareBox">
                <Col sm={2} md={2} lg={2} className="pt-1">
                    <Card className="dataKeys">
                        <h5>Compare By Keys</h5>
                    {
                        keys.map((item, id) => (
                            <div key={id} onMouseOver={() => handleCompare(item)}>
                                <h6>{item}</h6>
                            </div>
                        ))
                    }
                </Card>
                </Col>
                {heroCompre.slice(0,5).map((data) => {
                    return (
                        <Col sm={4} md={2} lg={2} key={data.id}>
                            <Card className="cardDetails">
                                <img src={data.image.url} alt={data.name} height={150}/>
                                <div className="mt-3 allDetail">
                                {/* className={highestValue ? "highValue" : ""} */}
                                    <p>{data.name}</p><hr/>
                                    <p>{data.powerstats.combat}</p><hr/>
                                    <p>{data.powerstats.durability}</p><hr/>
                                    <p>{data.powerstats.intelligence}</p><hr/>
                                    <p>{data.powerstats.power}</p><hr/>
                                    <p>{data.powerstats.speed}</p><hr/>
                                    <p>{data.powerstats.strength}</p>
                                </div>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </Container>
    )
}

export default Compare