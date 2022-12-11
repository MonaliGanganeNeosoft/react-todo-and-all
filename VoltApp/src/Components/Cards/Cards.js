import { Card, Col } from "react-bootstrap";
import "../SearchBar/Search.css"

const Cards = ({storeData, handleData}) => {
    return(
        <>
            {storeData?.map((data) => {
                return (
                    <Col sm={6} md={4} lg={3}>
                        <Card className="cardDetails" id={data.id} onClick={() => handleData(data.id)}>
                            <img src={data.image.url} alt={data.name} height={200}/>
                            <div className="mt-2">
                                <p>Name: {data.name}</p>
                                <p>Strength: {data.powerstats.strength}</p>
                                <p>Durability: {data.biography.durability}</p>
                            </div>
                        </Card>
                    </Col>
                );
              })}
        </>
    )
}

export default Cards