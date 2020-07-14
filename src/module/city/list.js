import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Swal from 'sweetalert2/dist/sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

class listComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listCity:[]
        }
    }

    componentDidMount() {
        axios.get("http://localhost:3000/city/list/")
        .then(res => {
            const data = res.data.data;
            this.setState({ listCity:data });
        })
        .catch(error => {
            alert(error)
        });
    }

    loadFillData() {
        return this.state.listCity.map((data) => {
            return(
                <tr>
                    <th>{data.id}</th>
                    <td>{data.name}</td>
                    <td>{data.state.fu}</td>
                    <td>
                        <Link class="btn btn-outline-info" to={"/city/edit/"+data.id}>Edit</Link>
                    </td>
                    <td>
                        <button class="btn btn-outline-danger" onClick={() => this.onDelete(data.id)}>Delete</button>
                    </td>
                </tr>
            )
        })
    }

    sendDelete(cityId) {
        const baseUrl = 'http://localhost:3000/city/delete/'

        axios.post(baseUrl, {
            id: cityId
        })
        .then(response => {
            if(response.data.success) {
                Swal.fire(
                'Deleted!',
                'Your role has been deleted.',
                'success'
                )
                this.componentDidMount();
            }
        })
        .catch( error => {
            alert("Error 325")
        })
    }

    onDelete(id) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this imaginary file!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        })
        .then((result) => {
            if(result.value) {
                this.sendDelete(id)
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                )
            }
        })
    }

    render() {
        return(
            <table class="table table-hover table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">City</th>
                        <th scope="col">FU</th>
                        <th colspan="2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {this.loadFillData()}
                </tbody>
            </table>
        );
    }
}

export default listComponent;