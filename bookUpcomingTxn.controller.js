const {firebaseApp} = require('../models/database.model')

async function updateUpcomingTxns(req,res){
    if(!req.query.uid){
        res.status(404).send({Error:'UID missing'})
    }
    else{
        console.log(req.body)
        const citizenDetails = await firebaseApp.firestore().collection('Citizen').doc(req.query.uid).get()
        const dob = citizenDetails.data().DOB
        console.log(dob)
        console.log(typeof(citizenDetails.data().location._latitude))
        const uniqueBookingID = dob + Date.now()
        console.log(Number(req.body.Location._latitude))
        const data = {
            DateOfAppointment: req.body.DateOfAppointment,
            Location:{
                _latitude: Number(req.body.Location._latitude),
                _longitude: Number(req.body.Location._longitude)
            },
            OperatorID:req.body.OperatorID,
            Service:req.body.Service,
            UniqueBookingID:uniqueBookingID,
            isCashTxn:false,
            CashComplaintID:"None",
            CashTxnValue:"0",
            TxnStatus:"Not Done"
        }
        const upcomingTxnsCollection = await firebaseApp.firestore().collection('Citizen').doc(`${req.query.uid}Txns`).collection('UpcomingTxns').doc(uniqueBookingID).set(data)
        console.log(upcomingTxnsCollection)
        var amountToBePaid = {}
        if(req.body.Service=='Biometrics'){
            amountToBePaid.pay = 70
        }
        else if(req.body.Service=='Demographics'){
            amountToBePaid.pay = 100            
        }
        const pendingTxnsOperator = await firebaseApp.firestore().collection('Operator').doc(`${req.body.OperatorID}Txns`).collection('PendingTxns').doc(uniqueBookingID).set({
            BookingID:uniqueBookingID,
            bookingDate:req.body.DateOfAppointment,
            CustomerUID:req.query.uid,
            CustomerName:citizenDetails.data().Name,
            Service:req.body.Service,
            AmountToBePaid:amountToBePaid.pay
        })
        res.status(200).send({Upcoming:'Did Something'})
    }
}
module.exports = {
    updateUpcomingTxns
}