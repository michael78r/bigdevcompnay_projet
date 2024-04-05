import React, { useState, useEffect } from "react";
import { Template } from "../template";
import Swal from "sweetalert2";
import axios from "axios";

export default function Info_Joueur() {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };



    const [etat, setEtat] = useState(0)

    const [idjoueur, setIdJoueur] = useState('')

    const [joueurs, setJoueurs] = useState([])

    // const [parcours, setParcours] = useState([])

    const [nationals, setNationals] = useState([''])

    const [clubs, setClubs] = useState([''])

    const [nom, setNom] = useState('')

    const [date_naissance, setDate_naissance] = useState('')

    const [nombre_but, setNombre_but] = useState('')

    const [club, setClub] = useState('')

    const [national, setNational] = useState('')

    const [parcours, setParcours] = useState([
        { nom: '', annee: '' }
    ]);

    const [allparcours, setAllParcours] = useState([])

    const [isSaving, setIsSaving] = useState(false)

    const [isUpdate, setIsupdate] = useState(true)

    useEffect(() => {
        fetchPlayer();
        fetchNational();
        fetchClub();
    }, [etat]);

    useEffect(() => {
        if (clubs.length > 0) {
            setClub(clubs[0].id);
        }
    }, [clubs]);

    useEffect(() => {
        if (nationals.length > 0) {
            setNational(nationals[0].id);
        }
    }, [nationals]);

    // --------------------------FETCH------------------------------------

    const handleShow = (id) => {
        fetchParcours(id)
    }

    console.log(allparcours)

    const fetchParcours = (id) => {
        axios.get(`/api/parcours/${id}`)
            .then(function (response) {
                setAllParcours(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const fetchPlayer = () => {
        axios.get(`/api/alldetails_joueur`)
            .then(function (response) {
                setJoueurs(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

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

    // --------------------------SAVE------------------------------------

    const handleSave = () => {

        setIsSaving(true);

        const dataToSend = {
            nom: nom,
            date_naissance: date_naissance,
            nombre_but: nombre_but,
            club: club,
            national: national,
            parcours: parcours
        };

        console.log(JSON.stringify(dataToSend))
        axios.post('/api/add_joueur', dataToSend, config)
            .then(function (response) {
                console.log(response.data)
                Swal.fire({ icon: 'success', title: 'player added!', showConfirmButton: false, timer: 700 })
                setIsSaving(false);
                setNom('')
                setDate_naissance('')
                setNombre_but('')
                setParcours([
                    { nom: '', annee: '' }
                ])
                fetchPlayer()
            })
            .catch(function (error) {
                console.log(error)
                Swal.fire({ icon: 'error', title: error, showConfirmButton: false, timer: 1500 })
                setIsSaving(false)
            });
    }

    // --------------------------UPDATE------------------------------------



    const handleUpdate = () => {
        const dataToSend = {
            idjoueur: idjoueur,
            nom: nom,
            date_naissance: date_naissance,
            nombre_but: nombre_but,
            club: club,
            national: national,
            parcours: parcours
        };
        console.log(JSON.stringify(dataToSend))
        axios.put(`/api/joueur`, dataToSend, config)
            .then(function (response) {
                console.log(response)
                Swal.fire({ icon: 'success', title: 'player modifié!', showConfirmButton: false, timer: 700 })
                //news()
                fetchPlayer()
            })
            .catch(function (error) {
                console.log(error)
                Swal.fire({ icon: 'error', title: error, showConfirmButton: false, timer: 1500 })
                setIsSaving(true);
            });
    }

    // --------------------------DELETE------------------------------------

    const handleDelete = (idj) => {
        Swal.fire({
            title: 'Voulez-vous vraiment supprimer ?',
            showCancelButton: true,
            confirmButtonText: 'Oui, supprimer!',
            cancelButtonText: 'Annuler',
            backdrop: true
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/joueur/${idj}`)
                    .then(function (response) {
                        console.log(response)
                        Swal.fire({ icon: 'success', title: 'player supprimé!', showConfirmButton: false, timer: 700 })
                        // news()
                        fetchPlayer()
                    })
                    .catch(function (error) {
                        console.log(error)
                        Swal.fire({ icon: 'error', title: error, showConfirmButton: false, timer: 1500 })
                        setIsSaving(true);
                    });
            }
        })
    }

    console.log("ito", idjoueur)


    const recuperer_donne = (cl) => {
        setIsSaving(true);
        setIdJoueur(cl.id)
        setNom(cl.nom)
        setDate_naissance(cl.date_naissance)
        setNombre_but(cl.nombre_but)
        setParcours([
            { nom: '', annee: '' }
        ])
        setIsupdate(false)
        setIsSaving(true)
    }

    const handleChangeParcours = (index, e) => {
        const { name, value } = e.target;
        const updatedParcours = [...parcours];
        updatedParcours[index][name] = value;
        setParcours(updatedParcours);
    };

    const addParcoursField = () => {
        setParcours(prevState => [
            ...prevState,
            { nom: '', annee: '' }
        ]);
    };

    const removeParcoursField = (index) => {
        const updatedParcours = [...parcours];
        updatedParcours.splice(index, 1);
        setParcours(updatedParcours);
    };

    return (
        <Template>
            <div class="container">
                <div class="row">
                    <div class="col-xl-5 col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h3>Player</h3>
                            </div>
                            <div className="card-body">
                                <h5>Information </h5>
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input
                                            onChange={(event) => { setNom(event.target.value) }}
                                            value={nom}
                                            type="text"
                                            className="form-control" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="name">Date of birth</label>
                                        <input
                                            onChange={(event) => { setDate_naissance(event.target.value) }}
                                            value={date_naissance}
                                            type="date"
                                            className="form-control" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="name">Number of goals </label>
                                        <input
                                            onChange={(event) => { setNombre_but(event.target.value) }}
                                            value={nombre_but}
                                            type="number"
                                            className="form-control" />
                                    </div>

                                    <div class="form-group">
                                        <label>National Team</label>
                                        <select className="form-control" onChange={(event) => setNational(event.target.value)}>
                                            {nationals.map((nat, index) => (
                                                <option key={nat.id} value={nat.id}>{nat.nom}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Club Team</label>
                                        <select className="form-control" onChange={(event) => setClub(event.target.value)}>
                                            {clubs.map((cl) => (
                                                <option key={cl.id} value={cl.id}>{cl.nom}</option>
                                            ))}
                                        </select>
                                    </div>


                                    {parcours.map((parcoursItem, index) => (
                                        <div key={index}>
                                            <h5> Career number {index + 1}</h5>
                                            <div>
                                                <label>Description</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="nom"
                                                    value={parcoursItem.nom}
                                                    onChange={(e) => handleChangeParcours(index, e)}
                                                />

                                                <label>Année </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="annee"
                                                    placeholder="Annnée XXXX - XXXX"
                                                    value={parcoursItem.annee}
                                                    onChange={(e) => handleChangeParcours(index, e)}
                                                />
                                            </div>

                                            {index > 0 && (
                                                <button type="button" onClick={() => removeParcoursField(index)}>
                                                    delete this
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button type="button" onClick={addParcoursField}>
                                        add career
                                    </button>
                                </form>
                            </div>

                            <div className="card-footer">
                                <button
                                    hidden={isUpdate}
                                    onClick={handleUpdate}
                                    type="button"
                                    className="btn btn-warning mt-3">
                                    update
                                </button>

                                <button
                                    hidden={isSaving}
                                    onClick={handleSave}
                                    type="button"
                                    className="btn btn-primary mt-3">
                                    add
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-7 col-md-12">
                        <div class="card table-card">
                            <div class="card-header">
                                <h5>Information player</h5>
                            </div>
                            <div class="card-body p-0">
                                <div class="table-responsive">
                                    <table class="table table-hover mb-0">
                                        <thead>
                                            <tr>
                                                <th>
                                                    Name
                                                </th>
                                                <th>Date of birth</th>
                                                <th colSpan={2}>Career</th>
                                                <th>Club Team</th>
                                                <th>National Team</th>
                                                <th>Goals</th>
                                                <th class="text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {joueurs.map((j, key) => {
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
                                                        <td>{j.date_naissance}</td>
                                                        <td><h6>{j.parcours}</h6></td>
                                                        <td>
                                                            {j.parcours > 0 && <a onClick={() => handleShow(j.id)}><i class="feather icon-info"></i></a>}
                                                        </td>
                                                        <td>{j.club}</td>
                                                        <td>{j.national}</td>
                                                        <td>{j.nombre_but}</td>
                                                        <td class="text-right">
                                                            <a onClick={() => recuperer_donne(j)}><i class="feather icon-edit text-muted"></i></a>
                                                            <a onClick={() => handleDelete(j.id)}><i class="feather icon-trash text-muted"></i></a>

                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>



                                    </table>
                                </div>
                            </div>
                        </div>

                        <div>
                            {allparcours.length > 0 &&
                                <table border={1}>
                                    <tr>
                                    <th></th>
                                        <th>Description</th>
                                        <th>Date</th>
                                    </tr>
                                    {allparcours.map((e, key) => {
                                        return (
                                            <tr key={key}>
                                            <td>career</td>
                                                <td>{e.nom}</td>
                                                <td>{e.date}</td>
                                            </tr>
                                        );
                                    })}
                                </table>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </Template>
    )
}