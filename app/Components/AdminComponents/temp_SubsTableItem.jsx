import React from 'react'

const SubsTableItem = ({ email, mongoId, deleteEmails, date }) => {
  const emailDate = new Date(date);
  return (
    <tr className='bg-white border-b text-left'>
      <td scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
        {email ? email : "No Email"}
      </td>
      <td className='px-6 py-3 hidden sm:block'>{emailDate.toDateString()}</td>
      <td className='px-6 py-3 text-red-500 cursor pointer' onClick={() => deleteEmails(mongoId)}>X</td>
    </tr>
  )
}

export default SubsTableItem
