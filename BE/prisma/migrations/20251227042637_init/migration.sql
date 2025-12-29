-- CreateTable
CREATE TABLE "User" (
    "UserID" TEXT NOT NULL,
    "Gmail" TEXT NOT NULL,
    "PhoneNumber" TEXT NOT NULL,
    "Family_Name" TEXT NOT NULL,
    "Sure_Name" TEXT NOT NULL,
    "Nickname" TEXT,
    "Birthday" TIMESTAMP(3) NOT NULL,
    "HashPassword" TEXT NOT NULL,
    "Pin_OTP" INTEGER,
    "isDelete" BOOLEAN NOT NULL DEFAULT false,
    "Role" TEXT NOT NULL,
    "IsOnline" BOOLEAN NOT NULL DEFAULT false,
    "Create_Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_Date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("UserID")
);

-- CreateTable
CREATE TABLE "Converstation" (
    "Conversation_ID" TEXT NOT NULL,
    "UserID_1st" TEXT NOT NULL,
    "UserID_2nd" TEXT NOT NULL,
    "Pin_Conversation" BOOLEAN DEFAULT false,
    "IsDelete" BOOLEAN NOT NULL DEFAULT false,
    "Create_Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_Date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Converstation_pkey" PRIMARY KEY ("Conversation_ID")
);

-- CreateTable
CREATE TABLE "Messenger" (
    "Mess_ID" TEXT NOT NULL,
    "SendID" TEXT NOT NULL,
    "ReciverID" TEXT NOT NULL,
    "Content" TEXT,
    "IsDelete" BOOLEAN NOT NULL DEFAULT false,
    "IsRead" BOOLEAN NOT NULL DEFAULT false,
    "Reply_Story_ID" TEXT,
    "Conversation_ID" TEXT NOT NULL,
    "Create_Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_Date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Messenger_pkey" PRIMARY KEY ("Mess_ID")
);

-- CreateTable
CREATE TABLE "Messenger_Media" (
    "MessMedia_ID" TEXT NOT NULL,
    "Mess_ID" TEXT NOT NULL,
    "Url_Media" TEXT NOT NULL,
    "IsDelete" BOOLEAN NOT NULL DEFAULT false,
    "Create_Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_Date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Messenger_Media_pkey" PRIMARY KEY ("MessMedia_ID")
);

-- CreateTable
CREATE TABLE "Messenger_Reaction" (
    "MessReaction_ID" TEXT NOT NULL,
    "Mess_ID" TEXT NOT NULL,
    "Reaction" TEXT NOT NULL,
    "IsDelete" BOOLEAN NOT NULL DEFAULT false,
    "Create_Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_Date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Messenger_Reaction_pkey" PRIMARY KEY ("MessReaction_ID")
);

-- CreateTable
CREATE TABLE "Notification" (
    "Notification_ID" TEXT NOT NULL,
    "UserID" TEXT NOT NULL,
    "Content" TEXT NOT NULL,
    "IsRead" BOOLEAN NOT NULL DEFAULT false,
    "URL_Notification" TEXT,
    "UserMake_Notification" TEXT,
    "Create_Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_Date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("Notification_ID")
);

-- CreateTable
CREATE TABLE "Story" (
    "Story_ID" TEXT NOT NULL,
    "UserID" TEXT NOT NULL,
    "Content" TEXT NOT NULL,
    "Url_Media" TEXT NOT NULL,
    "IsDelete" BOOLEAN NOT NULL DEFAULT false,
    "Create_Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Expired_Date" TIMESTAMP(3) NOT NULL,
    "Update_Date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Story_pkey" PRIMARY KEY ("Story_ID")
);

-- CreateTable
CREATE TABLE "Story_Reaction" (
    "StoryViewer_ID" TEXT NOT NULL,
    "Story_ID" TEXT NOT NULL,
    "UserID" TEXT NOT NULL,
    "IsDelete" BOOLEAN NOT NULL DEFAULT false,
    "Create_Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_Date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Story_Reaction_pkey" PRIMARY KEY ("StoryViewer_ID")
);

-- CreateTable
CREATE TABLE "Story_Viewer" (
    "StoryReact_ID" TEXT NOT NULL,
    "Story_ID" TEXT NOT NULL,
    "UserID" TEXT NOT NULL,
    "IsDelete" BOOLEAN NOT NULL DEFAULT false,
    "Create_Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_Date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Story_Viewer_pkey" PRIMARY KEY ("StoryReact_ID")
);

-- CreateTable
CREATE TABLE "Setting" (
    "Setting_ID" TEXT NOT NULL,
    "UserID" TEXT NOT NULL,
    "2FA" BOOLEAN NOT NULL DEFAULT false,
    "Private_PhoneNumber" BOOLEAN NOT NULL DEFAULT false,
    "Private_Profile" TEXT NOT NULL,
    "IsSearch_You" BOOLEAN NOT NULL DEFAULT true,
    "IsDelete" BOOLEAN NOT NULL DEFAULT false,
    "Create_Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_Date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("Setting_ID")
);

-- CreateTable
CREATE TABLE "Friend" (
    "ID" TEXT NOT NULL,
    "FriendID" TEXT NOT NULL,
    "UserID" TEXT NOT NULL,
    "Status" TEXT NOT NULL,
    "Content_Send" TEXT,
    "IsDelete" BOOLEAN NOT NULL DEFAULT false,
    "IsBlock" BOOLEAN NOT NULL DEFAULT false,
    "Create_Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_Date" TIMESTAMP(3) NOT NULL,
    "Start_Time" BIGINT NOT NULL,

    CONSTRAINT "Friend_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Mute_FriendNotification" (
    "Mute_ID" TEXT NOT NULL,
    "ID" TEXT NOT NULL,
    "Friend_ID_Mute" TEXT NOT NULL,
    "Type_Mute" TEXT NOT NULL,
    "Start_Time" TIMESTAMP(3),
    "End_Time" TIMESTAMP(3),
    "IsDelete" BOOLEAN NOT NULL DEFAULT false,
    "Create_Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_Date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Mute_FriendNotification_pkey" PRIMARY KEY ("Mute_ID")
);

-- CreateTable
CREATE TABLE "Audit_Log" (
    "ID" TEXT NOT NULL,
    "UserID" TEXT NOT NULL,
    "Action" TEXT NOT NULL,
    "Table_Name" TEXT NOT NULL,
    "Old_Value" TEXT NOT NULL,
    "New_Value" TEXT NOT NULL,
    "IP_Address" TEXT NOT NULL,
    "Create_Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_Date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Audit_Log_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Device" (
    "Device_ID" TEXT NOT NULL,
    "UserID" TEXT NOT NULL,
    "Device_Type" TEXT NOT NULL,
    "Device_Name" TEXT NOT NULL,
    "OS_Version" TEXT NOT NULL,
    "App_Version" TEXT NOT NULL,
    "Token_Device" TEXT NOT NULL,
    "IsActive" BOOLEAN NOT NULL DEFAULT true,
    "Create_Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_Date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("Device_ID")
);

-- CreateTable
CREATE TABLE "Authentication_JWT" (
    "Auth_JWT_ID" TEXT NOT NULL,
    "Content_Token" TEXT NOT NULL,
    "JwtToken" TEXT NOT NULL,
    "Create_Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Expired_Date" TIMESTAMP(3) NOT NULL,
    "Update_Date" TIMESTAMP(3) NOT NULL,
    "isUsed" BOOLEAN NOT NULL DEFAULT false,
    "UserID" TEXT NOT NULL,

    CONSTRAINT "Authentication_JWT_pkey" PRIMARY KEY ("Auth_JWT_ID")
);

-- CreateTable
CREATE TABLE "Authentication_RefeshToken" (
    "Auth_Ref_ID" TEXT NOT NULL,
    "Content_Token" TEXT NOT NULL,
    "Refesh_Token" TEXT NOT NULL,
    "Create_Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Expired_Date" TIMESTAMP(3) NOT NULL,
    "Update_Date" TIMESTAMP(3) NOT NULL,
    "isUsed" BOOLEAN NOT NULL DEFAULT false,
    "Auth_JWT_ID" TEXT NOT NULL,

    CONSTRAINT "Authentication_RefeshToken_pkey" PRIMARY KEY ("Auth_Ref_ID")
);

-- CreateTable
CREATE TABLE "Verify_Code" (
    "Code_ID" TEXT NOT NULL,
    "Content" TEXT NOT NULL,
    "Verify_Code" TEXT NOT NULL,
    "isUsed" BOOLEAN NOT NULL DEFAULT false,
    "Create_Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_Date" TIMESTAMP(3) NOT NULL,
    "UserID" TEXT NOT NULL,

    CONSTRAINT "Verify_Code_pkey" PRIMARY KEY ("Code_ID")
);

-- CreateTable
CREATE TABLE "Group_Conversation" (
    "Group_ID" TEXT NOT NULL,
    "Owner_ID" TEXT NOT NULL,
    "Name_Group" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "IsDelete" BOOLEAN NOT NULL DEFAULT false,
    "Create_Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_Date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Group_Conversation_pkey" PRIMARY KEY ("Group_ID")
);

-- CreateTable
CREATE TABLE "Group_Member" (
    "GMember_ID" TEXT NOT NULL,
    "Group_ID" TEXT NOT NULL,
    "User_ID" TEXT NOT NULL,
    "Role_Group" TEXT NOT NULL,
    "IsDelete" BOOLEAN NOT NULL DEFAULT false,
    "MemberInvite_ID" TEXT NOT NULL,
    "Create_Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_Date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Group_Member_pkey" PRIMARY KEY ("GMember_ID")
);

-- CreateTable
CREATE TABLE "Group_Messenger" (
    "GroupMess_ID" TEXT NOT NULL,
    "Group_ID" TEXT NOT NULL,
    "SendID" TEXT NOT NULL,
    "Content" TEXT,
    "IsDelete" BOOLEAN NOT NULL DEFAULT false,
    "Create_Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_Date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Group_Messenger_pkey" PRIMARY KEY ("GroupMess_ID")
);

-- CreateTable
CREATE TABLE "GMessenger_Media" (
    "MessMedia_ID" TEXT NOT NULL,
    "GroupMess_ID" TEXT NOT NULL,
    "Url_Media" TEXT NOT NULL,
    "IsDelete" BOOLEAN NOT NULL DEFAULT false,
    "Create_Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_Date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GMessenger_Media_pkey" PRIMARY KEY ("MessMedia_ID")
);

-- CreateTable
CREATE TABLE "GMessenger_Reaction" (
    "MessReaction_ID" TEXT NOT NULL,
    "GroupMess_ID" TEXT NOT NULL,
    "Reaction" TEXT NOT NULL,
    "IsDelete" BOOLEAN NOT NULL DEFAULT false,
    "Create_Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_Date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GMessenger_Reaction_pkey" PRIMARY KEY ("MessReaction_ID")
);

-- CreateTable
CREATE TABLE "GMessenger_Read" (
    "MessRead_ID" TEXT NOT NULL,
    "GroupMess_ID" TEXT NOT NULL,
    "UserID_Read" TEXT NOT NULL,
    "IsDelete" BOOLEAN NOT NULL DEFAULT false,
    "Create_Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_Date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GMessenger_Read_pkey" PRIMARY KEY ("MessRead_ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Gmail_key" ON "User"("Gmail");

-- AddForeignKey
ALTER TABLE "Converstation" ADD CONSTRAINT "Converstation_UserID_1st_fkey" FOREIGN KEY ("UserID_1st") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Converstation" ADD CONSTRAINT "Converstation_UserID_2nd_fkey" FOREIGN KEY ("UserID_2nd") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messenger" ADD CONSTRAINT "Messenger_SendID_fkey" FOREIGN KEY ("SendID") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messenger" ADD CONSTRAINT "Messenger_ReciverID_fkey" FOREIGN KEY ("ReciverID") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messenger" ADD CONSTRAINT "Messenger_Conversation_ID_fkey" FOREIGN KEY ("Conversation_ID") REFERENCES "Converstation"("Conversation_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messenger" ADD CONSTRAINT "Messenger_Reply_Story_ID_fkey" FOREIGN KEY ("Reply_Story_ID") REFERENCES "Story"("Story_ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messenger_Media" ADD CONSTRAINT "Messenger_Media_Mess_ID_fkey" FOREIGN KEY ("Mess_ID") REFERENCES "Messenger"("Mess_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messenger_Reaction" ADD CONSTRAINT "Messenger_Reaction_Mess_ID_fkey" FOREIGN KEY ("Mess_ID") REFERENCES "Messenger"("Mess_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_UserMake_Notification_fkey" FOREIGN KEY ("UserMake_Notification") REFERENCES "User"("UserID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Story" ADD CONSTRAINT "Story_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Story_Reaction" ADD CONSTRAINT "Story_Reaction_Story_ID_fkey" FOREIGN KEY ("Story_ID") REFERENCES "Story"("Story_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Story_Reaction" ADD CONSTRAINT "Story_Reaction_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Story_Viewer" ADD CONSTRAINT "Story_Viewer_Story_ID_fkey" FOREIGN KEY ("Story_ID") REFERENCES "Story"("Story_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Story_Viewer" ADD CONSTRAINT "Story_Viewer_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Setting" ADD CONSTRAINT "Setting_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_FriendID_fkey" FOREIGN KEY ("FriendID") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mute_FriendNotification" ADD CONSTRAINT "Mute_FriendNotification_ID_fkey" FOREIGN KEY ("ID") REFERENCES "Friend"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Audit_Log" ADD CONSTRAINT "Audit_Log_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Authentication_JWT" ADD CONSTRAINT "Authentication_JWT_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Authentication_RefeshToken" ADD CONSTRAINT "Authentication_RefeshToken_Auth_JWT_ID_fkey" FOREIGN KEY ("Auth_JWT_ID") REFERENCES "Authentication_JWT"("Auth_JWT_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Verify_Code" ADD CONSTRAINT "Verify_Code_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group_Conversation" ADD CONSTRAINT "Group_Conversation_Owner_ID_fkey" FOREIGN KEY ("Owner_ID") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group_Member" ADD CONSTRAINT "Group_Member_Group_ID_fkey" FOREIGN KEY ("Group_ID") REFERENCES "Group_Conversation"("Group_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group_Member" ADD CONSTRAINT "Group_Member_User_ID_fkey" FOREIGN KEY ("User_ID") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group_Member" ADD CONSTRAINT "Group_Member_MemberInvite_ID_fkey" FOREIGN KEY ("MemberInvite_ID") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group_Messenger" ADD CONSTRAINT "Group_Messenger_Group_ID_fkey" FOREIGN KEY ("Group_ID") REFERENCES "Group_Conversation"("Group_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group_Messenger" ADD CONSTRAINT "Group_Messenger_SendID_fkey" FOREIGN KEY ("SendID") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GMessenger_Media" ADD CONSTRAINT "GMessenger_Media_GroupMess_ID_fkey" FOREIGN KEY ("GroupMess_ID") REFERENCES "Group_Messenger"("GroupMess_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GMessenger_Reaction" ADD CONSTRAINT "GMessenger_Reaction_GroupMess_ID_fkey" FOREIGN KEY ("GroupMess_ID") REFERENCES "Group_Messenger"("GroupMess_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GMessenger_Read" ADD CONSTRAINT "GMessenger_Read_GroupMess_ID_fkey" FOREIGN KEY ("GroupMess_ID") REFERENCES "Group_Messenger"("GroupMess_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GMessenger_Read" ADD CONSTRAINT "GMessenger_Read_UserID_Read_fkey" FOREIGN KEY ("UserID_Read") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;
