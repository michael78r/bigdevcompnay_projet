import React, { useState, useEffect } from "react";
import { Template } from "../template";
import Swal from "sweetalert2";
import axios from "axios";

export default function Info_National() {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const [nationals, setNationals] = useState([])

    const [etat, setEtat] = useState(0)

    const [idNational, setIdNational] = useState()

    const [nom, setNom] = useState('')

    const [photo, setPhoto] = useState('')

    const [isSaving, setIsSaving] = useState(false)

    const [isUpdate, setIsupdate] = useState(true)

    useEffect(() => {
        fetchNational();
    }, [etat]);

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

        // --------------------------SAVE------------------------------------

    const handleSave = () => {

        setIsSaving(true);

        const dataToSend = {
            nom: nom,
            photo: photo
        };

        console.log(JSON.stringify(dataToSend))
        axios.post('/api/national', dataToSend, config)
            .then(function (response) {
                console.log(response.data)
                Swal.fire({ icon: 'success', title: 'Club added!', showConfirmButton: false, timer: 700 })
                setIsSaving(false);
                setNom('')
                setPhoto('')
                fetchNational()
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
            id:idNational,
            nom: nom,
            photo: photo,
        };
        console.log(JSON.stringify(dataToSend))
        axios.put(`/api/national`, dataToSend, config)
            .then(function (response) {
                Swal.fire({ icon: 'success', title: 'Club modifié!', showConfirmButton: false, timer: 700 })
                //news()
                fetchNational()
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
                axios.delete(`/api/national/${idj}`)
                    .then(function (response) {
                        console.log(response)
                        Swal.fire({ icon: 'success', title: 'Club supprimé!', showConfirmButton: false, timer: 700 })
                        // news()
                        fetchNational()
                    })
                    .catch(function (error) {
                        console.log(error)
                        Swal.fire({ icon: 'error', title: error, showConfirmButton: false, timer: 1500 })
                        setIsSaving(true);
                    });
            }
        })
    }


    const recuperer_donne = (cl) => {
        setIsSaving(true);
        setIdNational(cl.id)
        setNom(cl.nom)
        setPhoto('')
        setIsupdate(false)
        setIsSaving(true)
    }

    return (
        <Template>
            <div class="container">
                <div class="row">
                    <div class="col-xl-5 col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h3>National Team</h3>
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
                                        <label htmlFor="name">Photo</label>
                                        <input
                                            onChange={(event) => { setPhoto(event.target.value) }}
                                            value={photo}
                                            type="file"
                                            className="form-control" />
                                    </div>

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
                                <h5>Information national</h5>
                            </div>
                            <div class="card-body p-0">
                                <div class="table-responsive">
                                    <table class="table table-hover mb-0">
                                        <thead>
                                            <tr>
                                                <th>
                                                    Name
                                                </th>
                                                <th>Photo</th>
                                                <th class="text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {nationals.map((j, key) => {
                                                return (
                                                    <tr key={key}>
                                                        <td> <h6>{j.nom}</h6></td>
                                                        <td>{j.photo}</td>
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
                    </div>
                </div>
            </div>
        </Template>
    )
}