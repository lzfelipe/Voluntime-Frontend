import React, { Component } from 'react'

import { apiPath } from "../configs/configs";
import backIcon from '../assets/SVG/back.svg'
import { motion } from "framer-motion"
import bgSignin from '../assets/png/bgsignin.png'

import { Link } from "react-router-dom";
//Components
import { DefaultBtn, DefaultInput, DefaultContainer, DefaultTitle, DefaultText } from './styles/defaultComponents'


class Login extends Component {
    state = {
        msg: ''
    }

    async login(e) {
        e.preventDefault();
        const url = `${apiPath}/ong`

        const requestInfo = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.id.value,
                password: this.senha.value
            })
        }

        await fetch(url, requestInfo).then(res => {
            res.json().then(payload => {
                console.log(payload)
                if (payload.success === false) {
                    this.setState({ msg: "Credenciais Inválidas." })
                }
                else {
                    console.log(payload)
                    window.location.href = '/recrutador/'+payload.id
                }
            })
        })
    }

    render() {
        return (
            <motion.div  animate={{x: '0vh', opacity: 1}} initial={{x: '-30vh', opacity: 0}} transition={{duration: 0.3}} >
                <DefaultContainer heightDiv="5vh" style={{ justifyContent: 'flex-start', paddingTop: 20 }}>
                    <Link to="/">
                        <img src={backIcon} style={{ height: "6vh", paddingLeft: 20, paddingTop: 20 }} alt="Voltar" />
                    </Link>
                </DefaultContainer>
                <DefaultContainer heightDiv="62vh">
                    <DefaultTitle>Para instituições</DefaultTitle>

                    {
                        this.state.msg === '' ? null : <DefaultContainer heightDiv="11%"><DefaultText>{this.state.msg}</DefaultText></DefaultContainer>
                    }
                    <form onSubmit={this.login.bind(this)} style={{}}>
                        <DefaultInput placeholder="ID da ong" type="number" required={true} ref={value => this.id = value} name="id" />
                        <br />
                        <DefaultInput placeholder="Senha" type="password" required={true} ref={value => this.senha = value} name="senha" />
                        <br />
                        <DefaultContainer heightDiv="10%">
                            <DefaultBtn type="submit"> Entrar </DefaultBtn>
                        </DefaultContainer>
                    </form>
                </DefaultContainer>

                <DefaultContainer heightDiv="152px">
                    <img src={bgSignin}  width="100%" style={{position: "absolute", bottom: "-25%", maxHeight: "30vh"}} alt=""/>
                </DefaultContainer>
            </motion.div>
        );
    }
}

export default Login
