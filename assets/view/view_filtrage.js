import React, { useState, useEffect } from "react";
import { Template } from "../template";
import Swal from "sweetalert2";
import axios from "axios";

export default function View_filtrage() {

    const [etat, setEtat] = useState(0)

    const [c, setC] = useState(1)

    const [n, setN] = useState(1)

    const [joueur_club, setJoueur_club] = useState([])

    const [joueur_national, setJoueur_national] = useState([])

    const [nationals, setNationals] = useState([''])

    const [clubs, setClubs] = useState([''])


    useEffect(() => {
        fetchNational();
        fetchClub();
    }, [etat]);

    useEffect(() => {
        fetchPlayerNational();
    }, [n])

    useEffect(() => {
        fetchPlayerClub();
    }, [c])


    // --------------------------FETCH------------------------------------

    const fetchNational = () => {
        axios.get(`/api/all_national`)
            .then(function (response) {
                setNationals(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const fetchClub = () => {
        axios.get(`/api/all_club`)
            .then(function (response) {
                setClubs(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const fetchPlayerNational = () => {
        axios.get(`/api/joueur_national/${n}`)
            .then(function (response) {
                setJoueur_national(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const fetchPlayerClub = () => {
        axios.get(`/api/joueur_club/${c}`)
            .then(function (response) {
                setJoueur_club(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }


    return (
        <Template>
            <div class="container">
                <div class="row">
                    <div class="col-xl-7 col-md-12">
                        <div class="card table-card">
                            <div class="card-header d-flex justify-content-between align-items-center">
                                <h5>Player Club</h5>

                                <div className="form-group">
                                    <select className="form-control" onChange={(event) => setC(event.target.value)}>
                                        {clubs.map((cl) => (
                                            <option key={cl.id} value={cl.id}>{cl.nom}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div class="card-body p-0">
                                <div class="table-responsive">
                                    <table class="table table-hover mb-0">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                {/* <th>Date of birth</th> */}
                                                <th>Club Team</th>
                                                <th>Goals</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {joueur_club.map((j, key) => {
                                                return (
                                                    <tr key={key}>
                                                        <td>
                                                            <div class="d-inline-block align-middle">

                                                                <div class="d-inline-block">
                                                                    <h6>{j.nom}</h6>
                                                                    <p class="text-muted m-b-0">{j.national}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        {/* <td>{j.dataNaissance}</td> */}
                                                        <td>{j.idClub.nom}</td>
                                                        <td>{j.nombreBut}</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>



                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-7 col-md-12">
                        <div class="card table-card">
                            <div class="card-header d-flex justify-content-between align-items-center">
                                <h5>Player National</h5>
                                <div class="form-group mb-0">
                                    <select class="form-control" onChange={(event) => setN(event.target.value)}>
                                        {nationals.map((nat, index) => (
                                            <option key={nat.id} value={nat.id}>{nat.nom}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div class="card-body p-0">
                                <div class="table-responsive">
                                    <table class="table table-hover mb-0">
                                        <thead>
                                            <tr>
                                                <th>
                                                    Name
                                                </th>
                                                {/* <th>Date of birth</th> */}
                                                <th>National Team</th>
                                                <th>Goals</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {joueur_national.map((j, key) => {
                                                return (
                                                    <tr key={key}>
                                                        <td>
                                                            <div class="d-inline-block align-middle">

                                                                <div class="d-inline-block">
                                                                    <h6>{j.nom}</h6>
                                                                    <p class="text-muted m-b-0">{j.national}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        {/* <td>{j.dataNaissance}</td> */}
                                                        <td>{j.idNational.nom}</td>
                                                        <td>{j.nombreBut}</td>

                                                    </tr>
                                                )
                                            })}
                                        </tbody>



                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Template>
    )
}