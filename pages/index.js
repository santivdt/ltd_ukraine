import styles from "../styles/Home.module.css"
import { data } from "../utils/data"
import { useState } from "react"
import { nanoid } from "nanoid"
import { TextField } from "@mui/material"

import Autocomplete from "@mui/material/Autocomplete"
import { Button } from "@mui/material"

export default function Home() {
  const gemeenten = data.map(item => ({ ...item, id: nanoid() }))
  const [value, setValue] = useState(gemeenten[0])
  const [name, setName] = useState(null)
  const [emailBody, setEmailBody] = useState(null)

  const handleChange = (event, newValue) => {
    console.log(newValue)
    if (newValue) {
      setValue(newValue)
    }
  }

  const handleNameChange = event => {
    setName(event.target.value)
  }

  const generateEmail = () => {
    setEmailBody(
      `Beste Gemeente ${value.label},\n\nDoor de Russische invasie van Oekraïne wordt de situatie voor de Oekraïense bevolking steeds nijpender. Volgens een schatting van de UNHCR zijn er nu  meer dan 660.000 mensen op de vlucht, naast de mensen die al ontheemd waren. \n\nDe woordvoerder van het Centraal Orgaan opvang Asielzoekers (COA) heeft aangegeven dat de huidige azc’s vol zitten en er naarstig gezocht wordt naar nieuwe opvangplekken. Opvang in de regio was de afgelopen jaren vaak beleid. In deze crisis zijn wij de regio. Wij zijn solidair met burgers die vluchten voor geweld en oorlog, net als in eerdere situaties zoals de Balkanoorlogen. Toen vingen we tot 80.000 vluchtelingen op (bron: RTL Nieuws). Het is onze morele plicht nu dezelfde inzet te tonen.  \n\nIk roep daarom de Gemeente ${value.label} op om panden aan te wijzen die geschikt zijn voor opvang van deze vluchtelingen en opvang actief te faciliteren in samenwerking met het COA.\n\nIk vertrouw erop dat wij ons gastvrij opstellen en de opvang van deze vluchtelingen bewerkstelligen. In afwachting van uw respons. \n\nMet vriendelijke groet, \n ${name} \n\n Ik stuur deze mail als onderdeel van een campagne van DeGoedeZaak voor de opvang van Oekraïense vluchtelingen. \n\n Zie https://www.degoedezaak.org/gemeenten-vang-vluchtelingen-op/ voor meer informatie!`
    )
  }

  const handleEmailChange = event => {
    console.log(event.target.value)
    setEmailBody(event.target.value)
  }

  return (
    <div className={styles.container}>
      <Autocomplete
        disablePortal
        value={value.label}
        onChange={handleChange}
        id="search"
        className={styles.input}
        options={gemeenten}
        placeholder="Begin met typen.."
        sx={{ width: 300 }}
        renderInput={params => <TextField {...params} label="Gemeente" />}
      />
      <div className={styles.namecontainer}>
        <TextField
          id="first"
          required
          label="Naam"
          name="first"
          variant="outlined"
          value={name}
          onChange={handleNameChange}
          sx={{ width: 300 }}
        />
      </div>

      {!emailBody && (
        <Button
          variant="contained"
          onClick={generateEmail}
          sx={{ mt: 3, width: 300 }}
          disabled={!name}
        >
          Genereer mail
        </Button>
      )}
      {emailBody && (
        <>
          <TextField
            id="emailBody"
            label="Email"
            multiline
            rows={12}
            autoFocus
            defaultValue={emailBody}
            sx={{ width: 400, mt: 3 }}
            onChange={handleEmailChange}
          />
          <a
            href={
              "mailto:" +
              value.email +
              "?subject=Bied Oekraiense vluchtelingen een veilig onderdak&body=" +
              encodeURIComponent(emailBody)
            }
            target="_new"
          >
            <Button variant="contained" sx={{ mt: 3 }}>
              Verstuur
            </Button>
          </a>
        </>
      )}
    </div>
  )
}
