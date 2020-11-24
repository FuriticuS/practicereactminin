import React, {Component} from 'react';
import MenuToggle from "../containers/Navigation/MenuToggle/MenuToggle";
import Drawer from "../containers/Navigation/Drawer/Drawer";

import './layout.scss';

class Layout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menu: false
        }
    }

    // отображение и скрытие меню - при клике, противоположное значение что есть в state в menu
    toggleMenuHandler = () => {
        this.setState({
            menu: !this.state.menu
        })
    }

    // скрытие меню - при клике - ПОЛНОСТЬЮ
    toggleMenuCLose = () => {
        this.setState({
            menu: false
        })
    }

    render() {
        return(
            <div className={'layout'}>

                <Drawer
                    isOpen={this.state.menu}
                    onClose={this.toggleMenuCLose}
                />

                <MenuToggle
                    isOpen={this.state.menu}
                    onToggle={this.toggleMenuHandler}
                />

                <main>
                    {this.props.children}
                </main>

            </div>
        )
    }
}

export default Layout;
