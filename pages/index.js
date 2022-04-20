import styles from "../styles/Home.module.css"
import { data } from "../utils/data"
import { useState } from "react"
import { nanoid } from "nanoid"
import { TextField, Checkbox, FormGroup, FormControlLabel } from "@mui/material"

import Autocomplete from "@mui/material/Autocomplete"
import { Button } from "@mui/material"

export default function Home() {
  const gemeenten = data.map(item => ({ ...item, id: nanoid() }))
  const [value, setValue] = useState(gemeenten[0])
  const [name, setName] = useState("Santi")
  const [emailBody, setEmailBody] = useState(null)
  const [nieuwsbrief, setNieuwsbrief] = useState(false)

  const handleChange = (event, newValue) => {
    if (newValue) {
      setValue(newValue)
    }
  }

  const handleNameChange = event => {
    setName(event.target.value)
  }

  const generateEmail = () => {
    setEmailBody(
      `Geachte burgemeester van ${value.label},\n\nIk zou u graag iets willen vragen over de opvang die onze stad organiseert voor Oekraïense vluchtelingen. Uiteraard bent u op de hoogte van de nijpende situatie in Ter Apel, waar vandaag (19 april) zelfs 300 mensen op straat dreigde te komen staan. Inmiddels is bekend dat Nijmegen, Oss en Amsterdam in de bres zijn gesprongen voor deze asielzoekers die uit een ander land dan Oekraïne gevlucht zijn. Hoewel het probleem tijdelijk is opgelost, zou ik u toch het volgende willen vragen: \n\n1. Is de opvang in onze gemeente al helemaal vol, of zijn daar nog plekken vrij?\n2. Indien daar nog plekken vrij zijn, houdt u die dan vrij voor vluchtelingen uit Oekraïne? \n3. Is het mogelijk om, mede gelet op het gelijkheidsbeginsel zoals neergelegd in artikel 1 van onze Grondwet, deze opvang open te stellen voor asielzoekers voor wie in ter Apel geen plek meer is? \n4. Indien de opvang in onze gemeente vol is, en wederom gelet op het gelijkheidsbeginsel, is het mogelijk om elders in onze stad opvang te realiseren om zo Ter Apel te ontlasten en de asielopvang in ons land iets van zijn waardigheid terug te geven? \n\nIk hoop dat u deze vragen kunt beantwoorden. Ik kan ook als u daar prijs op stelt mijn vragen in een gesprek toelichten.\n\nMet vriendelijke groet\n${name}`
    )
  }

  const handleEmailChange = event => {
    setEmailBody(event.target.value)
  }

  const handleCheckbox = () => {
    setNieuwsbrief(!nieuwsbrief)
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
          <div>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox checked={nieuwsbrief} onChange={handleCheckbox} />
                }
                label="Ja, ik blijf graag op de hoogte van acties van DeGoedeZaak"
              />
            </FormGroup>
          </div>
          {nieuwsbrief ? (
            <a
              href={
                "mailto:" +
                value.email +
                "?subject=Bied Oekraiense vluchtelingen een veilig onderdak&body=" +
                encodeURIComponent(emailBody) +
                "&bcc=info@degoedezaak.org"
              }
              target="_new"
            >
              <Button variant="contained" sx={{ mt: 3 }}>
                Verstuur
              </Button>
            </a>
          ) : (
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
          )}
        </>
      )}
    </div>
  )
}
