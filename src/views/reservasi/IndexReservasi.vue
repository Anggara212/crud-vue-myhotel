<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>DATA RESERVASI</h4>
                        <hr>
                        <router-link :to="{name: 'reservasi.create'}" class="btn btn-md btn-success">TAMBAH RESERVASI
                        </router-link>

                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">Tipe</th>
                                    <th scope="col">Harga Kamar</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Jumlah Kamar</th>
                                    <th scope="col">Checkin</th>
                                    <th scope="col">Checkout</th>
                                    <th scope="col">Option</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(reservasi, index) in reservasis" :key="index">
                                    <td>{{ reservasi.tipe }}</td>
                                    <td>{{ reservasi.harga_kamar }}</td>
                                    <td>{{ reservasi.name }}</td>
                                    <td>{{ reservasi.jumlah_kamar }}</td>
                                    <td>{{ reservasi.checkin }}</td>
                                    <td>{{ reservasi.checkout }}</td>
                                    <td class="text-center">
                                        <router-link :to="{name: 'reservasi.edit', params:{id: reservasi.id }}"
                                            class="btn btn-sm btn-primary mr-1">EDIT</router-link>
                                        <button @click.prevent="reservasiDelete(reservasi.id)" class="btn btn-sm btn-danger ml-1">DELETE</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import {
        onMounted,
        ref
    } from 'vue'

    export default {

        setup() {

            //reactive state
            let reservasis = ref([])

            //mounted
            onMounted(() => {

                //get API from Laravel Backend
                axios.get('http://localhost:8000/api/Reservasi')
                    .then(response => {

                        //assign state posts with response data
                        reservasis.value = response.data.data

                    }).catch(error => {
                        console.log(error.response.data)
                    })

            })
            //method delete
            function reservasiDelete(id) {

                //delete data post by ID
                axios.delete(`http://localhost:8000/api/Reservasi/${id}`)
                    .then(() => {

                        //splice posts 
                        reservasis.value.splice(reservasis.value.indexOf(id), 1);

                    }).catch(error => {
                        console.log(error.response.data)
                    })

            }
            //return
            return {
                reservasis,
                reservasiDelete
            }

        }

    }
</script>

<style>
    body {
        background: rgb(134, 131, 131);
    }
</style>