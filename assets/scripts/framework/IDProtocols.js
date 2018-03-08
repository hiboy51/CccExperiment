/**
 *  只允许依次从后面添加
 * */
var Protocol_Ids = {
    DISCONNECT: "disconnect",

    // ================================================================================================
    // 尽量不要修改该文件
    // 若必要，请从尾部依次添加
    // ================================================================================================

    REC_LOGIN_FINISHED : "login_finished",
    REC_LOGIN_RESULT   : "login_result",
    REC_GAME_START     : "game_start_push",
    REC_EXIT_RESULT    : "exit_result",
    REC_EXIT_NOTIFY    : "exit_notify_push",
    REC_DISPRESS       : "dispress_push",
    REC_DISCONNECT     : "disconnect",
    REC_USER_COMEIN    : "new_user_comes_push",
    REC_GAME_DINGZHUANG: "game_dingzhuang_push",
    REC_USER_STATE     : "user_state_push",
    REC_USER_READY     : "user_ready_push",
    REC_GAME_HOLDS     : "game_holds_push",
    REC_GAME_BEGIN     : "game_begin_push",
    REC_SAME_IP        : "game_seamip_push",
    REC_GAME_PLAYING   : "game_playing_push",
    REC_BAOJIAO        : "game_baojiaoing_push",
    REC_GAME_SYNC      : "game_sync_push",
    REC_DINGQUE        : "game_dingque_push",
    REC_HUANPAI        : "game_huanpai_push",
    REC_HANGGANG       : "hangang_notify_push",
    REC_GAME_ACTION    : "game_action_push",
    REC_CHUPAI         : "game_chupai_push",
    REC_GAME_NUM       : "game_num_push",
    REC_GAME_OVER      : "game_over_push",
    REC_MJ_COUNT       : "mj_count_push",
    REC_HU             : "hu_push",
    REC_CHUPAI_NOTIFY  : "game_chupai_notify_push",
    REC_MOPAI          : "game_mopai_push",
    REC_GUO_NOTIFY     : "guo_notify_push",
    REC_GUO_RESULT     : "guo_result",
    REC_GUOHU          : "guohu_push",
    REC_HUANPAI_NOTIFY : "huanpai_notify",
    REC_HUANPAI_OVER   : "game_huanpai_over_push",
    REC_PENG           : "peng_notify_push",
    REC_BAOJIAO_NOTIFY : "baojiao_notify_push",
    REC_GANG_NOTIFY    : "gang_notify_push",
    REC_DINGQUE_NOTIFY : "game_dingque_notify_push",
    REC_DINGQUE_FINISH : "game_dingque_finish_push",
    REC_CHAT           : "chat_push",
    REC_QUICK_CHAT     : "quick_chat_push",
    REC_EMOJI          : "emoji_push",
    REC_DISSOLVE_NOTICE: "dissolve_notice_push",
    REC_DISSOLVE_CANCEL: "dissolve_cancel_push",
    REC_VOICE_MSG      : "voice_msg_push",

    REC_PLAYER_LEAVE     : "game_playerleave_notify_push",
    REC_USER_STATE_NOTIFY: "user_state_notify_push",

    // ================================================================================================
    // 尽量不要修改该文件
    // 若必要，请从尾部依次添加
    // ================================================================================================

    // 牛牛
    REC_NIUNIU_READY_NOTIFY      : "game_ready_notify_push",
    REC_NIUNIU_QIANGZHUANG_NOTIFY: "game_qiangzhuang_notify_push",
    REC_NIUNIU_DINGZHUANG        : "game_dingzhuang_notify_push",
    REC_NIUNIU_YAZHU_PUSH        : "game_yazhu_push",
    REC_NIUNIU_YAZHU_NOTIFY_PUSH : "game_yazhu_notify_push",
    REC_NIUNIU_HOLDS_PUSH        : "game_holds_push",
    REC_NIUNIU_TANPAI_NOTIFY_PUSH: "game_tanpai_notify_push",
    REC_NIUNIU_GAME_OVER         : "game_over_notify_push",
    REC_NIUNIU_NEW_USUER_COME    : "new_user_come_notify_push",
    REC_NIUNIU_CAN_QIANGZHUANG   : "game_canqiangzhuang_notify_push",

    REC_EXIT_ROOM           : "exit_result",
    REC_DISSOLVE_NOTICE_PUSH: "dissolve_notice_notify_push",

    REC_GAME_START_NOTIFY_PUSH: "game_start_notify_push",

    // ================================================================================================
    // 尽量不要修改该文件
    // 若必要，请从尾部依次添加
    // ================================================================================================

    REC_BAOJIAOEND  : "game_baojiao_end_push",
    REC_GUOPENG     : "guopeng_push",
    REC_SCORE_CHANGE: "score_change",
};

module.exports = Protocol_Ids;