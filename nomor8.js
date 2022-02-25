const dataPenjualanNovel = [
    {
        idProduct: 'BOOK002421',
        namaProduk: 'Pulang - Pergi',
        penulis: 'Tere Liye',
        hargaBeli: 60000,
        hargaJual: 86000,
        totalTerjual: 150,
        sisaStok: 17,
    },
    {
        idProduct: 'BOOK002351',
        namaProduk: 'Selamat Tinggal',
        penulis: 'Tere Liye',
        hargaBeli: 75000,
        hargaJual: 103000,
        totalTerjual: 171,
        sisaStok: 20,
    },
    {
        idProduct: 'BOOK002941',
        namaProduk: 'Garis Waktu',
        penulis: 'Fiersa Besari',
        hargaBeli: 67000,
        hargaJual: 99000,
        totalTerjual: 213,
        sisaStok: 5,
    },
    {
        idProduct: 'BOOK002941',
        namaProduk: 'Laskar Pelangi',
        penulis: 'Andrea Hirata',
        hargaBeli: 55000,
        hargaJual: 68000,
        totalTerjual: 20,
        sisaStok: 56,
    },
];

function getInfoPenjualan(dataPenjualan) {

    tBeli = dataPenjualan.map(obj => obj.hargaBeli)
    tJual = dataPenjualan.map(obj => obj.hargaJual)
    tTerjual = dataPenjualan.map(obj => obj.totalTerjual)
    tTerjual2 = dataPenjualan.map(obj => obj.totalTerjual)
    tStok = dataPenjualan.map(obj => obj.sisaStok)
    namaProduk = dataPenjualan.map(obj => obj.namaProduk)
    penulis = dataPenjualan.map(obj => obj.penulis)

    var tModal = 0
    var tkeuntg = 0
    var pk = 0

    for (i = 0; i <= 3; i++) {
        var tModal = (tBeli[i] * (tTerjual[i] + tStok[i])) + tModal
        var tkeuntg = ((tJual[i] * tTerjual[i])) + tkeuntg
    }

    var tkeuntg = tkeuntg - tModal
    var pk = (tkeuntg / tModal) * 100
    var arry = tTerjual.sort((a, b) => a - b)  // sortir array total terjual  menjadi [20,150.171,213]
    var terlaris = arry[tTerjual.length - 1]   // mencari value total terjual tertinggi dengan cara panjang array total terjual - 1 ( karena array dimulai dari 0)
    var cariTerlaris = tTerjual2.indexOf(terlaris) // mencari array berapakah yang terdapat nilai terjual terbesar dengan indexOf
    var bukuTerlaris = namaProduk[cariTerlaris]   // mencari nama buku terlaris yaitu namaproduk[index array cariTerlaris]
    var penulisTerlaris = penulis[cariTerlaris]

    const buku = {
        totalKeuntungan: 'Rp. ' + tkeuntg,    // (harga jual * total terjual)   - total modal
        totalModal: 'Rp. ' + tModal,    // harga beli * (total terjual + totalstok ) 
        persentaseKeuntungan: pk + '%',    //  total keuntungan (total keuntungan / total modal ) * 100%
        produkBukuTerlaris: bukuTerlaris,   /*  buku terlaris diambil dari value obj.totalTerjual tertinggi  */
        penulisTerlaris: penulisTerlaris,  // 
    }

    if (typeof buku == "object") {
        return buku
    }

}

console.log(getInfoPenjualan(dataPenjualanNovel))