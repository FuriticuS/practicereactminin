import React, {Component} from 'react';
import {block} from 'bem-cn';
import BackDrop from "../../UI/BackDrop/BackDrop";
import {NavLink} from "react-router-dom";

import './drawer.scss';

const cn = block('drawer');

const links = [
    {id:0, to: '/', label:'Список', exact: true},
    {id:1, to: '/auth', label:'Авторизация', exact: false},
    {id:2, to: '/quiz-creator', label:'Создать тест', exact: false}
]

class Drawer extends Component {

    constructor(props) {
        super(props);
    }

    renderLinks(){
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        onClick={this.props.onClose}
                    >
                        {link.label}
                    </NavLink>
                </li>
            )
        })
    }

    render() {

        const cls = [
            cn()
        ]

        !this.props.isOpen && cls.push('close');

        return(

            <div>
                {
                    this.props.isOpen && <BackDrop onClick={this.props.onClose}/>
                }

                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks()}
                    </ul>
                </nav>
            </div>
        )
    }
}

export default Drawer;
