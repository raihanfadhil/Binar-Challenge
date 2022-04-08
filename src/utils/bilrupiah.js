export default function bilrupiah(angka){
        var	reverse = angka.toString().split('').reverse().join(''),   
	    ribuan 	= reverse.match(/\d{1,3}/g);        
	    ribuan	= ribuan.join('.').split('').reverse().join('');  
        return ribuan 
    }
