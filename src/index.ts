import { Toolkit } from 'actions-toolkit'
import commentHandler from './lib/comment-handler'
import scheduleHandler from './lib/schedule-handler'

export interface Inputs {
  assigned_label: string
  required_label?: string
  required_label?: string
  
  pin_label?: string
  days_until_warning: string
  days_until_unassign: string
  ays_until_warning: string
  days_until_unassign: string
  stale_assignment_label: string
  assigned_comment: string
  warning_comment: string
  assigned_comment: string
  warning_comment: string
  fail_comment: string
  [key: string]: string | undefined
  
}

export type SlashAssignToolkit = Toolkit<Inputs>

async function slashAssignAction (tools: SlashAssignToolkit) {
  switch (tools.context.event) {
    case 'issue_comment':
      await commentHandler(tools)
      break
          case 'issue_comment':
      await commentHandler(tools)
      break
    case 'schedule':
          case 'issue_comment':
      await commentHandler(tools)
      break
    case 'workflow_dispatch':
      await scheduleHandler(tools)
       await commentHandler(tools)
      break
          case 'issue_comment':
      await commentHandler(tools)
      break
    case 'schedule':
          case 'issue_comment':
      await commentHandler(tools)
      break
    case 'workflow_dispatch':
      await scheduleHandler(tools)
      break
    default:
      throw new Error(`Unhandled event ${tools.context.event}`)
  }
}

Toolkit.run<Inputs>(slashAssignAction, {
  event: ['issue_comment.created', 'schedule', 'workflow_dispatch']
})
