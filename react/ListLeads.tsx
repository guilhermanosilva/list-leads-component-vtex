import React, { useEffect, useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { FormattedMessage } from 'react-intl'

import UpdateForm from './components/UpdateForm'
import api from './services/api'

interface ListLeadProps {
  name: string
  phone: string
  email: string
  typeUser: string
  created: string
  updated: string
  deleteBtn: string
}

interface LeadItem {
  id: string
  name: string
  email: string
  phone: string
  type: string
  created_at: string
  updated_at: string
}

const CSS_HANDLES = [
  'tableContainer',
  'tableComponent',
  'tableHead',
  'tableRowHeader',
  'tableHeadCell',
  'tableBody',
  'tableRowBody',
  'tableDataCell',
  'tableButton'
]

const ListLeads: StorefrontFunctionComponent<ListLeadProps> = ({
  deleteBtn,
  name,
  phone,
  email,
  typeUser,
  created,
  updated
}: ListLeadProps) => {

  const handles = useCssHandles(CSS_HANDLES)

  const [leads, setLeads] = useState<LeadItem[]>([])
  const [currentLead, setCurrentLead] = useState<LeadItem>()
  const [showModal, setShowModal] = useState<Boolean>(false)

  const nameText = name || <FormattedMessage id='list-leads.name' />
  const phoneText = phone || <FormattedMessage id='list-leads.phone' />
  const emailText = email || <FormattedMessage id='list-leads.email' />
  const typeText = typeUser || <FormattedMessage id='list-leads.type' />
  const createdText = created || <FormattedMessage id='list-leads.created' />
  const updatedText = updated || <FormattedMessage id='list-leads.updated' />
  const deleteText = deleteBtn || <FormattedMessage id='list-leads.deleteBtn' />

  useEffect(() => {
    api.get('/items')
      .then(response => {
        setLeads(response.data.Items)
      })
  }, [])

  function handleRemove(e: any, id: string) {
    let delBtn = e.target
    delBtn.innerText = 'Deletando...'

    api.delete(`/items/${id}`)
      .then(res => {
        removeLead(res.data)
        delBtn.innerText = 'Deletar'
      })
  }

  function removeLead(id: string) {
    const newLeads = leads.filter(lead => lead.id !== id)
    setLeads(newLeads)
  }

  function handleUpdateLead(lead: LeadItem) {
    setCurrentLead(lead)
    handleToggleModal()
  }

  function handleToggleModal() {
    if (showModal) {
      setShowModal(false)
    } else {
      setShowModal(true)
    }
  }

  function updateLeads(updatedLead: LeadItem) {
    setLeads((prev: LeadItem[]) => [...prev, updatedLead])
    setTimeout(() => {
      console.log('Lista de leads:\n', leads)
    }, 1500)
  }

  return (
    <div className={`${handles.tableContainer}`} style={{ overflowX: 'auto' }}>
      <h1>Leads Cadastrados</h1>
      <table className={`${handles.tableComponent}`}>
        <thead className={`${handles.tableHead}`}>
          <tr className={`${handles.tableRowHeader}`}>
            <th className={`${handles.tableHeadCell}`}>{nameText}</th>
            <th className={`${handles.tableHeadCell}`}>{phoneText}</th>
            <th className={`${handles.tableHeadCell}`}>{emailText}</th>
            <th className={`${handles.tableHeadCell}`}>{typeText}</th>
            <th className={`${handles.tableHeadCell}`}>{createdText}</th>
            <th className={`${handles.tableHeadCell}`}>{updatedText}</th>
            <th className={`${handles.tableHeadCell}`}></th>
          </tr>
        </thead>
        <tbody className={`${handles.tableBody}`}>
          {leads.map(lead => (
            <tr key={lead.id} className={`${handles.tableRowBody}`} >
              <td className={`${handles.tableDataCell}`}>{lead.name}</td>
              <td className={`${handles.tableDataCell}`}>{lead.phone}</td>
              <td className={`${handles.tableDataCell}`}>{lead.email}</td>
              <td className={`${handles.tableDataCell}`}>{lead.type}</td>
              <td className={`${handles.tableDataCell}`}>{lead.created_at}</td>
              <td className={`${handles.tableDataCell}`}>{lead.updated_at}</td>
              <td className={`${handles.tableDataCellButton} ${handles.tableDataCell}`}>
                <button
                  className={`${handles.tableButton}`}
                  onClick={(e) => handleRemove(e, lead.id)}
                >
                  {deleteText}
                </button>
                <button
                  className={`${handles.tableButton}`}
                  onClick={() => handleUpdateLead(lead)}>
                  Atualizar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal ?
        <UpdateForm
          handleToggleModal={handleToggleModal}
          currentLead={currentLead}
          updateLeads={updateLeads}
          removeLead={removeLead}
        /> :
        ''}
    </div>
  )
}

ListLeads.schema = {
  title: 'editor.list-leads.title',
  type: 'object',
  properties: {
    deleteBtn: {
      title: 'list-leads.deleteBtn',
      type: 'string',
      default: null
    },
    name: {
      title: 'list-leads.name',
      type: 'string',
      default: null
    },
    phone: {
      title: 'list-leads.phone',
      type: 'string',
      default: null
    },
    email: {
      title: 'list-leads.email',
      type: 'string',
      default: null
    },
    typeUser: {
      title: 'list-leads.type',
      type: 'string',
      default: null
    },
    created: {
      title: 'list-leads.created',
      type: 'string',
      default: null
    },
    updated: {
      title: 'list-leads.updated',
      type: 'string',
      default: null
    }
  }
}

export default ListLeads
