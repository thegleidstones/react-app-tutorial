import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ExportCSV from '../../utils/ExportCSV';
import Swal from 'sweetalert2/dist/sweetalert2';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'sweetalert2/src/sweetalert2.scss';

class listComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			listEmployee: [],
			listXlsx: [],
			fileName: 'Employees'
		}
	}

	componentDidMount() {
		axios.get("http://localhost:3000/employee/list/")
			.then(res => {
				const data = res.data.data;
				this.setState({ listEmployee: data });
			})
			.catch(error => {
				alert(error)
			});

		axios.get("http://localhost:3000/employee/xlsx/")
			.then(res => {
				const data = res.data.data;
				this.setState({ listXlsx: data[0] });
			})
			.catch(error => {
				alert(error)
			})
	}

	loadFillData() {
		return this.state.listEmployee.map((data) => {
			return (
				<tr>
					<th>{data.id}</th>
					<td>{data.role.role}</td>
					<td>{data.name}</td>
					<td>{data.email}</td>
					<td>{data.address}</td>
					<td>{data.city.name}</td>
					<td>{data.city.state.fu}</td>
					<td>{data.phone}</td>
					<td>
						<Link class="btn btn-outline-info" to={"/employee/edit/" + data.id}>Edit</Link>
					</td>
					<td>
						<button class="btn btn-outline-danger" onClick={() => this.onDelete(data.id)}>Delete</button>
					</td>
				</tr>
			)
		})
	}

	sendDelete(userId) {
		const baseUrl = 'http://localhost:3000/employee/delete/'

		axios.post(baseUrl, {
			id: userId
		})
			.then(response => {
				if (response.data.success) {
					Swal.fire(
						'Deleted!',
						'Your employee has been deleted.',
						'success'
					)
					this.componentDidMount();
				}
			})
			.catch(error => {
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
				if (result.value) {
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
		return (
			<div className="col-md-12">
				<div className="col-md-12">
					<ExportCSV csvData={this.state.listXlsx} fileName={this.state.fileName} />
				</div>
				<br></br>
				<table class="table table-hover table-striped table-sm">
					<thead class="thead-dark">
						<tr>
							<th scope="col">#</th>
							<th scope="col">Role</th>
							<th scope="col">Name</th>
							<th scope="col">Email</th>
							<th scope="col">Address</th>
							<th scope="col">City</th>
							<th scope="col">FU</th>
							<th scope="col">Phone</th>
							<th colspan="2">Action</th>
						</tr>
					</thead>
					<tbody>
						{this.loadFillData()}
					</tbody>
				</table>
			</div>
		);
	}
}

export default listComponent;