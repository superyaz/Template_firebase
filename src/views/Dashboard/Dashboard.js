import React, { Component } from "react";
import { db } from "../../firebase/init";

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

        this.state = {
            dropdownOpen: false,
            radioSelected: 2
        };
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    onRadioBtnClick(radioSelected) {
        this.setState({
            radioSelected: radioSelected
        });
    }
/**
 * Recorro la base de datos y dentro de la collection news, obtengo dichos datos con el metodo get.
 */
    componentDidMount() {
        this.news = db.collection('news').get().then((res) => {
            res.forEach(doc => {
                this.setState({
                    img: doc.data().imageMain,
                    url: doc.data().link,
                    information: doc.data().longDescription
                    
                });
                // console.log(doc.data());
            });
        });
    }

    render() {
        return ( 
            <React.Fragment>
                
            </React.Fragment> 
        );
    }
}

export default Dashboard;