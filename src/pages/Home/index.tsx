import { CountDown } from "../../components/CountDown";
import { MainTemplate } from "../../templates/MainTemplate";
import { MainForm } from "../../components/Mainform";
import { Container } from "../../components/Container";

export function Home() {
    return (
        <MainTemplate>
            <Container>
                <CountDown/>
            </Container>
        
            <Container>
                <MainForm/>
            </Container>
        </MainTemplate>
    );
}