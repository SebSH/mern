import Person from '../models/personModel';
import moment from 'moment';
import jwt from 'jwt-simple';

export const signUp = (req, res) => {
  let person = new Person(req.body);
  var createdPerson = await person.save();

  req.json(createdPerson);
};

export const login = async (req, res) => {
  const person = await Person.findOne({ email: req.body.email });
  if(!person) {
    return res.snd('this user does not exist');
  }

  const password = req.body.password;
  bcrypt.compare(password, person.password, function(error, success) {
    if(success) {
      const payload = {
        exp: moment().add(1, 'hour').unix(),
        iat: moment().unix(),
        iss: person.id
      };

    let token = jwt.encode(paykoad, process.env.TOKEN_SECRET);
    res.json({
      firstName: person.firstName,
      lastName: person.lastname,
      token: 'Bearer ${token}',
      expiration: moment().add(1, 'hour').format('YYYY-MM-DD HH-mm-ss')
    });
    };
    res.send('this email and password combination is incorrect');
  });
}
