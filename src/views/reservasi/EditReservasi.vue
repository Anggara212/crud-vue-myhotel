<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>EDIT RESERVASI</h4>
                        <hr>

                        <form @submit.prevent="update">
                            <div class="form-group">
                                <label for="title" class="font-weight-bold">Tipe</label>
                                <input type="text" class="form-control" v-model="reservasi.tipe" placeholder="Masukkan Judul Reservasi">
                                <!-- validation -->
                                <div v-if="validation.tipe" class="mt-2 alert alert-danger">
                                    {{ validation.tipe[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="content" class="font-weight-bold">Harga Kamar</label>
                                <textarea class="form-control" rows="4" v-model="reservasi.harga_kamar" placeholder="Masukkan Konten Reservasi"></textarea>
                                <!-- validation -->
                                <div v-if="validation.harga_kamar" class="mt-2 alert alert-danger">
                                    {{ validation.harga_kamar[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="content" class="font-weight-bold">Name</label>
                                <textarea class="form-control" rows="4" v-model="reservasi.name" placeholder="Masukkan Konten Reservasi"></textarea>
                                <!-- validation -->
                                <div v-if="validation.name" class="mt-2 alert alert-danger">
                                    {{ validation.name[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="content" class="font-weight-bold">Jumlah Kamar</label>
                                <textarea class="form-control" rows="4" v-model=" reservasi.jumlah_kamar" placeholder="Masukkan Konten reservasi"></textarea>
                                <!-- validation -->
                                <div v-if="validation.jumlah_kamar" class="mt-2 alert alert-danger">
                                    {{ validation.jumlah_kamar[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="content" class="font-weight-bold">Checkin</label>
                                <textarea class="form-control" rows="4" v-model="reservasi.checkin" placeholder="Masukkan Konten Reservasi"></textarea>
                                <!-- validation -->
                                <div v-if="validation.checkin" class="mt-2 alert alert-danger">
                                    {{ validation.checkin[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="content" class="font-weight-bold">Checkout</label>
                                <textarea class="form-control" rows="4" v-model="reservasi.checkout" placeholder="Masukkan Konten Reservasi"></textarea>
                                <!-- validation -->
                                <div v-if="validation.checkout" class="mt-2 alert alert-danger">
                                    {{ validation.checkout[0] }}
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary">SIMPAN</button>
                        </form>                        

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

export default {

    setup() {

        //state posts
        const reservasi = reactive({
            tipe: '',
            harga_kamar: '',
            name: '',
            jumlah_kamar: '',
            checkin: '',
            checkout: ''
        })

        //state validation
        const validation = ref([])

        //vue router
        const router = useRouter()

        //vue router
        const route = useRoute()

        //mounted
        onMounted(() => {

            //get API from Laravel Backend
            axios.get(`http://localhost:8000/api/Reservasi/${route.params.id}`)
            .then(response => {
              
              //assign state posts with response data
              reservasi.tipe    = response.data.data.tipe  
              reservasi.harga_kamar  = response.data.data.harga_kamar
              reservasi.name    = response.data.data.name  
              reservasi.jumlah_kamar  = response.data.data.jumlah_kamar
              reservasi.checkin    = response.data.data.checkin  
              reservasi.checkout  = response.data.data.checkout
        
            }).catch(error => {
                console.log(error.response.data)
            })

        })

        //method update
        function update() {

            let tipe   = reservasi.tipe
            let harga_kamar = reservasi.harga_kamar
            let name   = reservasi.name
            let jumlah_kamar = reservasi.jumlah_kamar
            let checkin   = reservasi.checkin
            let checkout = reservasi.checkout

            axios.put(`http://localhost:8000/api/Reservasi/${route.params.id}`, {
                tipe: tipe,
                harga_kamar: harga_kamar,
                name: name,
                jumlah_kamar: jumlah_kamar,
                checkin: checkin,
                checkout: checkout
            }).then(() => {

                //redirect ke post index
                router.push({
                    name: 'reservasi.index'
                })

            }).catch(error => {
                //assign state validation with error 
                validation.value = error.response.data
            })

        }

        //return
        return {
            reservasi,
            validation,
            router,
            update
        }

    }

}
</script>

<style>
    body{
        background: rgb(134, 131, 131);
    }
</style>