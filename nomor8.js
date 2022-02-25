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

    var totalBeli = dataPenjualan.map(obj => obj.hargaBeli)
    var totalJual = dataPenjualan.map(obj => obj.hargaJual)
    var totalTerjual = dataPenjualan.map(obj => obj.totalTerjual)
    var totalTerjual2 = dataPenjualan.map(obj => obj.totalTerjual)
    var totalStok = dataPenjualan.map(obj => obj.sisaStok)
    var namaProduk = dataPenjualan.map(obj => obj.namaProduk)
    var penulis = dataPenjualan.map(obj => obj.penulis)

    var tModal = 0
    var tKeuntungan = 0
    var pKeuntungan = 0

    for (i = 0; i <= 3; i++) {
        var tModal = (totalBeli[i] * (totalTerjual[i] + totalStok[i])) + tModal
        var tKeuntungan = ((totalJual[i] * totalTerjual[i])) + tKeuntungan
    }

    var tKeuntungan = tKeuntungan - tModal
    var pKeuntungan = (tKeuntungan / tModal) * 100
    var arry = totalTerjual.sort((a, b) => a - b)  // Array pada totalTerjual di sortir menjadi [20,150.171,213]
    var terlaris = arry[totalTerjual.length - 1]   // Value dari total terjual tertinggi dengan cara jumlah data totalTerjual - 1 => 4-1 = 3( karena array dimulai dari 0)
    var cariTerlaris = totalTerjual2.indexOf(terlaris) // Array yang terdapat nilai terjual terbesar dengan indexOf
    var bukuTerlaris = namaProduk[cariTerlaris]  // Buku terlaris pada namaproduk
    var penulisTerlaris = penulis[cariTerlaris]

    const buku = {
        totalKeuntungan: 'Rp. ' + tKeuntungan,    // (harga jual * total terjual)   - total modal
        totalModal: 'Rp. ' + tModal,    // harga beli * (total terjual + totalstok ) 
        persentaseKeuntungan: pKeuntungan + '%',    //  total keuntungan (total keuntungan / total modal ) * 100%
        produkBukuTerlaris: bukuTerlaris,   /*  buku terlaris diambil dari value obj.totalTerjual tertinggi  */
        penulisTerlaris: penulisTerlaris,  // 
    }

    if (typeof buku == "object") {
        return buku
    }

}

console.log(getInfoPenjualan(dataPenjualanNovel))