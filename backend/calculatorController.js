class calculatorController {
    async getCalculator(req, res) {
        try {
            return res.send('calculator route is working')
        } catch(error) {
            res.send('calculator route is not working')
        }
    }
}

const controller =  new calculatorController();
export default controller;