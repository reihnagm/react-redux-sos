import React, { useEffect } from "react"
import { connect } from "react-redux"
import { getProfileEngineerBySlug } from "../../../../actions/engineer"
import { getConversationLists, getReplyConversationReplies, getCheckConversations, InsertIntoConversationReplies, changesReplyToRealtime } from "../../../../actions/message"
import Spinner from "../../../spinner"
import ProfileShowItem from "./profileshowitem/profileshowitem"

const Profile = ({ getProfileEngineerBySlug, getConversationLists, getReplyConversationReplies, getCheckConversations, InsertIntoConversationReplies, changesReplyToRealtime, message: { conversationLists, checkConversations, replies }, engineer: { engineer, loading }, user: { user }, match }) => {
  useEffect(() => {
    const fetchData = async () => {
      await getProfileEngineerBySlug(match.params.slug)
    }
    fetchData()
  }, [getProfileEngineerBySlug, match])

  return loading ? <Spinner /> : <ProfileShowItem engineer={engineer} user={user} getConversationLists={getConversationLists} getReplyConversationReplies={getReplyConversationReplies} conversationLists={conversationLists} replies={replies} changesReplyToRealtime={changesReplyToRealtime} getCheckConversations={getCheckConversations} checkConversations={checkConversations} InsertIntoConversationReplies={InsertIntoConversationReplies} />
}
const mapStateToProps = state => ({
  engineer: state.engineer,
  user: state.auth,
  message: state.message
})
export default connect(mapStateToProps, {
  getProfileEngineerBySlug,
  getConversationLists,
  getReplyConversationReplies,
  getCheckConversations,
  InsertIntoConversationReplies,
  changesReplyToRealtime
})(Profile)
