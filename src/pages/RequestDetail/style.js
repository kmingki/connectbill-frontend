import styled from '@emotion/styled';

const Container = styled.div`
    padding-right: 10%;
    padding-left:10%; 
`

const ContentContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
`

const Title = styled.div`
    padding: 70px;
`
const RequestContainer = styled.div`
    width: 50%;   
`
const Content = styled.div`
    margin-bottom: 60px;
`

const LeftContent = styled.div`
    width: 45%;
    padding: 20px 0;
    border: 1px solid #dcdcde;
    display: flex;
    flex-direction: column;
    align-items: center;

`
const UserInfo = styled.div`
    margin: 30px 0;
    diplay: flex;
    flex-direction: column;
    align-items: center;
`

const DescriptionContainer = styled.div`
    display: flex;
    flex-direction: column;
`
const BudgetWrapper = styled.div`
    display: inline-block;
    margin-left: 20px;
    font-weight: bold;
    font-size: 30px;
`
const PanoramaWrapper = styled.div`
    & .aframebox {
        width:100%;
        height: 300px;
        margin: 0 auto;
    }
`


export { Container,Title, ContentContainer, RequestContainer,Content, LeftContent, DescriptionContainer, 
    UserInfo, BudgetWrapper, PanoramaWrapper };