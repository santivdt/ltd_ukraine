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
  const [name, setName] = useState(null)
  const [zipcode, setZipcode] = useState(null)
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
      `Geachte burgemeester van ${value.label},\n\nAfgelopen weken heeft de crisis in Ter Apel zich steeds verder ontvouwd tot een waar humanitair drama. Artsen zonder Grenzen moet voor het eerst in eigen land in actie komen en honderden mensen sliepen nachtenlang buiten. Ik vind het onbestaanbaar dat dit in Nederland voor kan komen.\n\nHet Centraal Orgaan opvang Asielzoekers (COA) heeft aangegeven dat huidige opvanglocaties vol zitten. Er is meer plek nodig. Ook in onze gemeente moeten we alle zeilen bij zetten en laten zien dat mensen op de vlucht hier welkom zijn. Het is onze morele plicht hen gastvrijheid te tonen.\n\nIk roep daarom de Gemeente Aa en Hunze op om panden aan te wijzen die geschikt zijn voor opvang van deze vluchtelingen en opvang actief te faciliteren in samenwerking met het COA.\n\nIk vertrouw erop dat wij helpen extra plekken te realiseren om Ter Apel te verlichten. In afwachting van uw respons.\n\nMet vriendelijke groet\n${name}\n${zipcode}`
    )
  }

  const handleEmailChange = event => {
    setEmailBody(event.target.value)
  }

  const handleZipChange = event => {
    setZipcode(event.target.value)
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
          sx={{ width: 300, mb: 3 }}
        />
      </div>
      <div className={styles.namecontainer}>
        <TextField
          id="zip"
          required
          label="Postcode"
          name="zip"
          variant="outlined"
          value={zipcode}
          onChange={handleZipChange}
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
                "?subject=Vang vluchtelingen op!&body=" +
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
                "?subject=Vang vluchtelingen op!&body=" +
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
