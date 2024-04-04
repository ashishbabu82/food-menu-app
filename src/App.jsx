import React, { useEffect, useState } from "react";
import styled from "styled-components";

const App = () => {

  const URL = "http://localhost:9000"

  const [data , setData] = useState(null)
  const [filteredData, setFilteredData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedButton, setSelectedButton] = useState("all")


const searchFoods = (e)=> {
  const food = e.target.value
  // console.log(e.target.value)
  if(food === ""){
    setFilteredData(data)
  }

const filter = data?.filter((value) => (
  value.name.toLowerCase().includes(food.toLowerCase()) 
))
setFilteredData(filter)
console.log(filter)
} 

const filterFoods = (type) =>{
  setSelectedButton(type)
  if (type === "all"){
    setFilteredData(data)
    return
  }

const filter = data?.filter((food)=>(
  food.type.toLowerCase().includes(type.toLowerCase())
))

setFilteredData(filter)

}

const filterButtons = [
  {name : "All",
type : "all"
},
{name : "Breakfast",
type : "breakfast"
},
{name : "Lunch",
type : "lunch"
},
{name : "Dinner",
type : "dinner"
},
]

useEffect(() => {
  const fetchData = async() =>{
  setLoading(true)

  try {
      const response = await fetch(URL)
      const json = await response.json()
      setData(json)
      setFilteredData(json)
      setLoading(false)
    }
    
   catch (error) {

    setError("Oops!! Something went wrong")
    
  }}
  
fetchData()

}, [])

if(error){
  return <h1>{error}</h1>
}

if(loading){
  return <h1>LOADING...</h1>
}

  return (
    <>
      <Container>
        <TopContainer>
          <div className="logo">
            <img src="/logo.svg" alt="" />
          </div>
          <div className="search">
            <input type="text" placeholder="Search Food..." onChange={searchFoods} />
          </div>
        </TopContainer>
        <FilterSectionContainer>
{filterButtons.map(({name , type})=>(
  <Button key={name} onClick={()=>filterFoods(type)} isSelected = {type == selectedButton} >{name}</Button>
))}
        </FilterSectionContainer>

      </Container>
      <FoodCardContainer>
{filteredData?.map(({name , price ,text , image }) => (
  <FoodCard key={name}>
    
    <div className="foodImage">
  <img src={URL + image} alt="" />
</div>
<div className="foodInfo">
<div className="foodName">
  <p>{name}</p>
</div>

<div className="foodDesc">
  <p>{text}</p>

</div>
<div className="button">
<Button>${price}</Button>
</div>
</div>
  </FoodCard>
))}
      </FoodCardContainer>
    </>
  );
};

export default App;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const TopContainer = styled.div`

  height: 140px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .search input {
    height: 35px;
    padding: 0 10px;
    border: 1px solid #ff4343;
    border-radius: 5px;
    background-color: #323334;
    color: white;
  }

  @media (0<width<600px){
    flex-direction: column;
    height: 120px;
    padding-top: 15px;
  }
`;

const FilterSectionContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 15px 0;
`;

const Button = styled.button`
  background-color: ${({isSelected}) => isSelected ? "#fd0808" : "#ff4343"};
  color: white;
  padding: 3px 5px;
  border: ${({isSelected}) => isSelected ? "2px solid white" : "2px solid #ff4343"};;
  border-radius: 5px;
  cursor: pointer;
  &:hover{
    background-color: #ff4343;
    color: black;
  }
`;

const FoodCardContainer = styled.div`
  background-image: url("/bg.png");
  min-height: calc(100vh - 195px);
  background-size: cover;
  display: flex;
  flex-wrap: wrap;
  row-gap: 25px;
  column-gap: 32px;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
  
`
const FoodCard = styled.div`
   width: 340px;
  height: 167px;
  border: 0.66px solid;

  border-image-source: radial-gradient(
      80.69% 208.78% at 108.28% 112.58%,
      #eabfff 0%,
      rgba(135, 38, 183, 0) 100%
    ),
    radial-gradient(
      80.38% 222.5% at -13.75% -12.36%,
      #98f9ff 0%,
      rgba(255, 255, 255, 0) 100%
    );

  background: url(.png),
    radial-gradient(
      90.16% 143.01% at 15.32% 21.04%,
      rgba(165, 239, 255, 0.2) 0%,
      rgba(110, 191, 244, 0.0447917) 77.08%,
      rgba(70, 144, 213, 0) 100%
    );
  background-blend-mode: overlay, normal;
  backdrop-filter: blur(13.1842px);

  border-radius: 20px;

  display: flex;
  padding: 8px;
  

  .foodName p{
    font-size: 20px;

  }
  .foodDesc p{
    font-size: 13px;
    display: flex;
    justify-content: end;
  }
  .button {
    display: flex;
    justify-content: end;
    padding: 10px;
  }

`