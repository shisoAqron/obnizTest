
const fs = require("fs")
const Obniz = require("obniz")

const tokenObj = JSON.parse(fs.readFileSync('./token.json', 'utf8'))
const obniz = new Obniz(tokenObj.id)

obniz.onconnect = async () => {
    const motor = obniz.wired("DCMotor",  {forward:0, back:1})

    obniz.display.clear()
    obniz.display.print("API is standby")

    obniz.onmessage = (mes, from) => {
        obniz.display.clear();

        if(mes.action == 'motor'){
            if(!isNaN(mes.dur)){
                obniz.display.print("spin motor\n"+mes.dur+"[msec]\n")
                motorTimer(motor,mes.dur)
                obniz.wait(Number(mes.dur))
                obniz.display.print("\ndone!")
            }else{
                obniz.display.print("dur is invaild")
            }
            
        }
    }

    // obniz.io1.output(true); // output push-pull 5v
    // obniz.io1.pull("3v");
    // obniz.io1.drive("open-drain");

    // motor.power(50);
    // motor.forward();


    // obniz.io0.output(false)
    // obniz.io1.output(true)
    
    // const dur = 50; // [ms]
    // obniz.io.animation("animation-1", "loop", [
    //     {
    //         duration: dur,
    //         state: function(index){ // index = 0
    //         obniz.io0.output(false)
    //         obniz.io1.output(true)
    //         }
    //     },{
    //         duration: dur,
    //         state: function(index){ // index = 1
    //         obniz.io0.output(true)
    //         obniz.io1.output(false)
    //         }
    //     }
    // ])

}

const motorTimer = (motorName,duration) => {
    motorName.forward();
    setTimeout(() => {
        motorName.stop();
    }, duration);
}