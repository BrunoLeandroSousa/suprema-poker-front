import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
`;

export const Header = styled.header`
  width: 100%;
  height: 19rem;
  background-color: #212121;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 583px){
    height: 26rem;
  }
`;

export const HeaderItens = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  img{
      max-width: 15rem;
  }

  @media (max-width: 1024px){
    flex-direction: column;
    align-items: center;
  }
`;

export const HeaderMenu = styled.div`
   display: flex;

    a{
        color: white;
        text-decoration: none;
        font-size: 1.5rem;
        max-width: 12rem;
        text-align: center;
        margin-top: 1rem;
        padding: 1rem;
        background-color: goldenrod;
        max-height: 2rem;
        display: flex;
        justify-content: center;
        align-items:center;
        box-shadow: 0px 0px 10px 0px whitesmoke;
    }
    a+a{
        margin-left: 1rem;
        margin-right: 1rem;
    }

    @media (max-width: 583px){
        flex-direction: column;
        align-items: center;
    }
`;

export const Options = styled.section`
    width: 50%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    transform: translateY(-49px);
    div{
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-radius: 1rem;
        border: 3px solid goldenrod;
        background-color: white;
        min-width: 10rem;
        cursor: pointer;
        box-shadow: 0px 0px 10px 0px goldenrod;
        padding: 1rem 0rem;
        &:hover{
            background-color: blueviolet;
            transition: 0.3s;
            color: white;
        }
        
        p{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-weight: 600;
            margin: 0;
            color: green;
        }
        img{

        }
    }
    @media (max-width: 1024px){
        margin-top: 6rem;
    }
`;