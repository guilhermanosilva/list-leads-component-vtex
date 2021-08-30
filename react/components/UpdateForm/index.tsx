import React, { useState } from 'react'
import { useEffect } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import api from '../../services/api'

const CSS_HANDLES = [
  'modalContainer',
  'updateLeadFormContainer',
  'updateFormTitle',
  'updateLeadForm',
  'updateLeadInputContainer',
  'updateLeadInputLabel',
  'updateLeadInput',
  'updateLeadButton',
  'updateLeadButtonContainer',
  'successUpdateMsg'
]

const UpdateForm: StorefrontFunctionComponent = ({ handleToggleModal, currentLead, updateLeads, removeLead }) => {
  const handles = useCssHandles(CSS_HANDLES)

  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [phone, setPhone] = useState()
  const [registered, setRegistered] = useState(false)

  useEffect(() => {
    setName(currentLead.name)
    setEmail(currentLead.email)
    setPhone(currentLead.phone)
  }, [currentLead])

  function getName(e: any) {
    const value = e.target.value
    setName(value)
  }
  function getEmail(e: any) {
    const value = e.target.value
    setEmail(value)
  }
  function getPhone(e: any) {
    const value = e.target.value
    setPhone(value)
  }

  function handleUpdate(e: any) {
    e.preventDefault()

    const dataLead = {
      name,
      email,
      phone,
      type: currentLead.type,
      created_at: currentLead.created_at
    }

    api.put(`/items/${currentLead.id}`, dataLead).then((res) => {
      removeLead(currentLead.id)
      updateLeads(res.data)
      setRegistered(true)
      hiddenMessage()
    })

  }

  function hiddenMessage() {
    setTimeout(() => {
      setRegistered(false)
      handleToggleModal()
    }, 2000)
  }

  function UpdatedMessage() {
    return (
      <div className={handles.successUpdateMsg}>
        Usuário atualizado
      </div>
    )
  }

  return (
    <div className={`${handles.modalContainer}`}>
      {registered ?
        (<UpdatedMessage />)
        : <div className={`${handles.updateLeadFormContainer}`}>
          {!registered ? <div className={`${handles.updateFormTitle}`}>Atualizar Dados</div> : ''}
          <form className={`${handles.updateLeadForm}`} >

            <div className={`${handles.updateLeadInputContainer}`}>
              <label className={`${handles.updateLeadInputLabel}`} htmlFor="lead-name">Nome</label>
              <input type="text" name="name" id="lead-name" onChange={getName} className={`${handles.updateLeadInput}`} placeholder="Nome" defaultValue={currentLead?.name} />
            </div>

            <div className={`${handles.updateLeadInputContainer}`}>
              <label className={`${handles.updateLeadInputLabel}`} htmlFor="lead-email">Email</label>
              <input type="text" name="email" id="lead-email" onChange={getEmail} className={`${handles.updateLeadInput}`} placeholder="Email" defaultValue={currentLead?.email} />
            </div>

            <div className={`${handles.updateLeadInputContainer}`}>
              <label className={`${handles.updateLeadInputLabel}`} htmlFor="lead-phone">Telefone</label>
              <input type="text" name="phone" id="lead-phone" onChange={getPhone} className={`${handles.updateLeadInput}`} placeholder="Telefone" defaultValue={currentLead?.phone} />
            </div>

            <div className={`${handles.updateLeadButtonContainer}`}>
              <button onClick={() => handleToggleModal()} className={`${handles.closeModalButton}`}>Fechar</button>
              <button type="submit" onClick={(e) => handleUpdate(e)} className={`${handles.updateLeadButton}`}>Atualizar</button>
            </div>
          </form>
        </div>
      }
    </div>
  )
}

export default UpdateForm
