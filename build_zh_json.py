#!/usr/bin/env python3
import json

# Define translations with all smart quotes escaped properly as plain text
translations = {
  "meta": {
    "title": "TokScript - TikTok、Reels 和 Shorts 视频字幕下载器，即时获取文字记录",
    "description": "下载视频字幕、高清视频和封面图片，从 TikTok、Reels 和 Shorts 批量导出。加上我们的 AI 爆款脚本生成器和开场白写手分析工具。",
    "ogTitle": "TokScript - TikTok、Reels 和 Shorts 视频字幕下载器，即时获取文字记录",
    "ogDescription": "生成 TikTok 字幕，分析视频，解锁爆款增长。",
    "ogSiteName": "TokScript",
    "ogImageAlt": "TokScript - 社交分享预览",
    "twitterTitle": "TokScript - TikTok、Reels 和 Shorts 视频字幕下载器，即时获取文字记录",
    "twitterDescription": "生成 TikTok 字幕，分析视频，解锁爆款增长。"
  },
  "header": {
    "banner": {
      "textDesktop": "推荐客户赚取 40% 的循环佣金",
      "textMobile": "赚取 40% 循环佣金",
      "cta": "加入推荐计划 →",
      "dismissAriaLabel": "关闭横幅"
    },
    "logo": {
      "alt": "TokScript"
    },
    "nav": {
      "home": "首页",
      "features": "功能",
      "featuresLabel": "功能",
      "pricing": "价格",
      "affiliate": "推荐",
      "affiliateBadge": "💰 40%",
      "faqs": "常见问题",
      "support": "支持",
      "settings": "设置",
      "installExtension": "安装 Chrome 扩展",
      "logout": "退出登录",
      "helpSupport": "帮助与支持",
      "upgradePlan": "升级我的套餐"
    },
    "auth": {
      "login": "登录",
      "getStarted": "开始使用",
      "signUp": "注册",
      "userAvatarAlt": "用户头像"
    },
    "hamburger": {
      "ariaLabel": "打开菜单"
    }
  },
  "hero": {
    "aiBadge": "AI 驱动",
    "heading": "TikTok 字幕生成器",
    "subheading": "将任何 TikTok、Reels 和 Shorts 视频转换为文字",
    "input": {
      "placeholder": "在此粘贴最多 50 个视频链接（或 TikTok 合集）",
      "translateLabel": "翻译",
      "scanButton": "扫描视频",
      "downloadButton": "下载",
      "loadingButton": "加载中..."
    },
    "helperText": "同时下载最多 50 个视频（任何平台）和整个 TikTok 合集",
    "platforms": {
      "label": "支持：",
      "tiktok": "TikTok",
      "reels": "Reels",
      "shorts": "Shorts"
    },
    "error": {
      "emptyLink": "请输入有效的视频链接"
    }
  },
  "aiFeatures": {
    "title": "试试我们最新的 AI 功能！",
    "cards": {
      "coverImage": {
        "title": "保存封面图片",
        "description": "下载高清封面图片"
      },
      "downloadVideo": {
        "title": "下载高清视频",
        "description": "无水印，完整质量"
      },
      "viralHooks": {
        "title": "生成爆款开场白",
        "description": "即时创建爆款开场白"
      },
      "rewriteScripts": {
        "title": "重写脚本",
        "description": "将字幕转换为爆款视频"
      },
      "analyzeVirality": {
        "title": "分析传播力",
        "description": "了解视频为何爆火"
      }
    }
  },
  "preview": {
    "title": "预览：",
    "titleLine2": "您的仪表板已准备就绪",
    "description": "即时访问所有字幕、AI 工具、文件夹、批量上传等功能！",
    "ctaLoggedIn": "访问您的完整仪表板",
    "ctaLoggedOut": "登录以访问您的完整仪表板"
  },
  "platform": {
    "title": "第一大视频字幕",
    "titleLine2": "和下载平台",
    "subtitle": "最佳的视频转录、批量下载和 AI 内容工具",
    "bulkImport": {
      "title": "批量导入",
      "description": "一次批量导入最多 50 个 TikTok、Instagram 或 YouTube Shorts 链接，快速批量下载字幕。节省时间，高效管理大量视频，一个地方搞定。",
      "feature1": "批量导入最多 50 个视频链接",
      "feature2": "支持 TikTok、Instagram 和 YouTube Shorts",
      "feature3": "一次批量导出所有字幕",
      "feature4": "单个或批量处理选项",
      "cta": "立即开始",
      "imageAlt": "批量字幕处理界面，显示多个 TikTok 视频 URL 被导入"
    },
    "collection": {
      "title": "TikTok 合集和播放列表导入",
      "description": "用户可以粘贴公开 TikTok 合集（书签）或创作者播放列表的单个链接，自动导入并转录其中包含的所有视频。播放列表通常代表创作者基于特定主题、话题或系列的迷你剧集。",
      "feature1": "公开 TikTok 合集导入",
      "feature2": "创作者播放列表自动检测",
      "feature3": "系列和主题组织",
      "feature4": "自动保留元数据",
      "cta": "立即开始",
      "imageAlt": "合集导入界面，显示 TikTok 个人资料视频被批量下载"
    },
    "cloudStorage": {
      "title": "云存储",
      "description": "使用企业级加密在云中安全存储所有视频字幕。立即在每台设备上同步和访问您的文件。随时随地，具有自动云备份和无与伦比的可靠性。",
      "feature1": "具有加密的安全云存储",
      "feature2": "跨设备自动同步",
      "feature3": "随时随地从任何地方访问",
      "feature4": "企业级可靠性",
      "cta": "立即开始",
      "imageAlt": "云字幕库，保存的字幕按日期组织"
    },
    "history": {
      "title": "历史记录和收藏夹",
      "description": "访问您处理的每个视频的完整字幕历史记录，自动记录下载日期、字幕详情、视频来源和时长。立即以 TXT、XML 或 PDF 格式重新下载字幕，并使用自定义书签文件夹组织您的整个视频库。轻松共享、批量导出或查看字幕、合集和播放列表，实现终极视频字幕组织和工作流管理。",
      "feature1": "包含元数据的完整下载历史",
      "feature2": "自定义书签文件夹",
      "feature3": "以 TXT、XML、PDF 格式重新下载",
      "feature4": "批量导出和共享功能",
      "cta": "立即开始",
      "imageAlt": "字幕历史面板，显示之前处理的视频"
    },
    "mediaDownload": {
      "title": "高清视频和封面图片下载",
      "description": "下载 TikTok、Instagram Reels 和 YouTube Shorts 视频，高清质量无水印。立即保存高分辨率封面图片，保留所有支持平台的原始视频质量。",
      "feature1": "无水印的高清视频下载",
      "feature2": "封面图片提取和下载",
      "feature3": "多平台支持",
      "feature4": "原始质量保留",
      "cta": "立即开始",
      "imageAlt": "媒体下载界面，提供视频和封面图片保存选项"
    },
    "quickUrl": {
      "title": "快速 URL 下载",
      "description": "即时视频字幕，只需在任何视频 URL 前面添加 'tokscript.com/'。立即重定向并下载字幕，无需登录或访问主网站。快速、自动，适用于所有平台。",
      "feature1": "基于 URL 的即时下载",
      "feature2": "无需访问主网站",
      "feature3": "适用于所有支持的平台",
      "feature4": "自动重定向和处理",
      "cta": "立即开始",
      "imageAlt": "快速 URL 方法，显示粘贴和处理字幕提取"
    },
    "chromeExtension": {
      "title": "Chrome 扩展",
      "description": "使用我们的 Chrome 扩展在观看 TikTok、Instagram Reels 或 YouTube Shorts 时立即将视频字幕复制到剪贴板或下载为 .txt 文件，无需复制 URL。在网络和移动浏览器上都能工作，提供终极便利。",
      "feature1": "单击即可下载字幕",
      "feature2": "即时剪贴板复制",
      "feature3": "在网络和移动浏览器上工作",
      "feature4": "无需复制 URL",
      "cta": "立即开始",
      "imageAlt": "TokScript Chrome 扩展面板覆盖在 TikTok 视频页面上"
    },
    "teamCollab": {
      "title": "团队协作",
      "description": "适用于代理机构和品牌。与您的团队共享、管理和组织字幕。设置权限、实时协作、控制访问权限。完美适合代理机构、编辑和教育工作者。",
      "feature1": "与团队成员共享字幕",
      "feature2": "实时协作处理项目",
      "feature3": "管理工作区权限",
      "cta": "立即开始",
      "imageAlt": "团队工作区，具有共享字幕库和协作工具"
    },
    "aiAgents": {
      "title": "AI 工具",
      "description": "AI 驱动的传播力：开场白、爆款脚本写作和视频分解。解锁今天顶级爆款视频背后的秘密武器，由 AI 驱动。为那些想要赢得关注并快速增长的人设计。",
      "hookGenerator": {
        "title": "爆款开场白生成器：",
        "description": "在几秒钟内生成能停止滚动、久经考验的开场白。不再猜测或在前五秒内失去观众。"
      },
      "scriptWriter": {
        "title": "工具 #2 爆款脚本写手：",
        "description": "将任何视频字幕转换为全新的、爆款就绪的脚本。混音、模仿和创建独特内容，一键完成。"
      },
      "viralityExplainer": {
        "title": "工具 #3 传播力解释器：",
        "description": "看到视频爆火的确切原因。获得心理触发因素和算法秘密的可操作分解，这样您就可以重复这个公式。教育和指导用户沿途学习。"
      },
      "feature1": "爆款开场白生成器，实现即时互动",
      "feature2": "具有爆款本质保留的脚本改写器",
      "feature3": "传播力心理学分析和见解",
      "feature4": "一键内容转换",
      "cta": "立即开始",
      "imageAlt": "AI 驱动的仪表板，显示字幕分析和爆款开场白建议"
    }
  },
  "pricing": {
    "title": "定价",
    "subtitle": "找到适合您内容工作流的计划",
    "tabs": {
      "free": "免费",
      "annual": "年度",
      "monthly": "月度"
    },
    "free": {
      "title": "免费",
      "description": "测试基础功能",
      "price": "$0",
      "period": "永久",
      "feature1": "每天 5 个字幕",
      "feature2": "每天 5 次翻译",
      "feature3": "TikTok、Reels、Shorts",
      "feature4": "基础 Chrome 扩展",
      "notIncludedLabel": "不包括",
      "excluded1": "AI 工具",
      "excluded2": "批量导入",
      "ctaCurrentPlan": "当前计划",
      "ctaGetStarted": "开始使用"
    },
    "annual": {
      "title": "年度",
      "description": "严肃创作者的最佳价值",
      "price": "$39",
      "period": "每年",
      "monthlyBreakdown": "相当于每月 $3.25",
      "monthlyComparison": "（月度计划 = 每年 $120）",
      "recommended": "推荐",
      "aiAgentsLabel": "无限制 AI 工具",
      "hookGenerator": {
        "title": "爆款开场白生成器",
        "sub": "粘贴任何字幕 → 获得 20+ 久经考验的开场白"
      },
      "scriptWriter": {
        "title": "爆款脚本写手",
        "sub": "将任何爆款视频转换为您的脚本"
      },
      "viralityExplainer": {
        "title": "传播力解释器",
        "sub": "看到视频爆火的确切原因"
      },
      "bulkLabel": "批量处理",
      "feature1": "无限制字幕（无每日限制）",
      "feature2": "无限制翻译（任何语言）",
      "feature3": "一次批量导入 50 个视频",
      "allPlatforms": "所有平台",
      "feature4": "高清视频下载（无水印）",
      "ctaGetAnnual": "获取年度 - 节省 $81",
      "ctaCurrentPlan": "当前计划",
      "ctaUpgrade": "升级",
      "ctaProcessing": "处理中...",
      "ctaLoading": "加载中..."
    },
    "monthly": {
      "title": "月度",
      "description": "完整功能，灵活计费",
      "price": "$10",
      "period": "每月",
      "yearlyEquivalent": "= 每年 $120",
      "annualSaves": "年度可节省 $81",
      "everythingInAnnual": "年度计划中的一切：",
      "feature1": "所有 3 个 AI 工具（无限制）",
      "feature2": "无限制字幕",
      "feature3": "无限制翻译",
      "feature4": "批量导入 50 个视频",
      "costsMore": "每年成本更高 $81",
      "ctaGetMonthly": "获取月度",
      "ctaCurrentPlan": "当前计划",
      "ctaUpgrade": "升级",
      "ctaProcessing": "处理中..."
    }
  },
  "checkout": {
    "features": {
      "hookGenerator": "爆款开场白生成器",
      "scriptGenerator": "爆款脚本生成器",
      "unlimitedTranscripts": "无限制字幕",
      "unlimitedTranslations": "无限制翻译",
      "bulkImport": "批量导入（50 个视频）",
      "hdDownloads": "高清视频下载",
      "chromeExtensionPro": "Chrome 扩展专业版",
      "allExportFormats": "所有导出格式",
      "prioritySupport": "优先支持",
      "commercialUse": "商业用途"
    },
    "continueToCheckout": "继续结账",
    "createFreeAccount": "创建免费账户",
    "saveBadge": "节省 $81/年"
  },
  "stats": {
    "description": "41,000 多个用户已处理超过 260 万个视频",
    "counter": {
      "videosProcessed": {
        "amount": "260 万+",
        "label": "视频已处理"
      },
      "profilesDownloaded": {
        "amount": "19 万+",
        "label": "个人资料已下载"
      },
      "hoursSaved": {
        "amount": "12 万+",
        "label": "小时节省"
      },
      "minutesTotal": {
        "amount": "8400 万+",
        "label": "视频总分钟数"
      }
    }
  },
  "chromeExtensionBanner": {
    "title": "使用我们的 Chrome 扩展增强您的体验",
    "cta": "添加到 Chrome",
    "imageAlt": "TokScript Chrome 扩展，在 TikTok 视频上显示一键字幕提取"
  },
  "faq": {
    "title": "常见问题",
    "subtitle": "您的问题，已解答。",
    "bottomText": "还有更多问题？点击此处访问我们的支持文档。",
    "q1": {
      "title": "什么是 TokScript？",
      "answer": "TokScript 是一个 AI 驱动的平台，允许用户为 TikTok、Instagram Reels 和 YouTube Shorts 视频生成字幕。它提供批量导入、云存储、团队协作和 AI 工具等功能，以增强内容创建和管理。"
    },
    "q2": {
      "title": "谁可以使用 TokScript？",
      "answer": "TokScript 设计用于想要简化视频内容创建流程的内容创作者、社交媒体经理、营销团队、代理机构和企业。无论您是独立创作者还是大型团队的一部分，我们的平台都能扩展以满足您的需求。"
    },
    "q3": {
      "title": "TokScript 如何工作？",
      "answer": "只需上传您的视频链接或批量导入，我们的 AI 会分析内容以生成吸引人的脚本。然后您可以自定义、保存到您的云库并与您的团队共享。我们的 AI 工具还可以帮助优化脚本以获得更好的互动和传播力。"
    },
    "q4": {
      "title": "我可以自定义脚本吗？",
      "answer": "绝对可以！所有生成的脚本都是完全可自定义的。您可以编辑、重写、添加自己的风格，并保存多个版本。我们的平台还提供 AI 驱动的建议，帮助您优化脚本以获得最大互动。"
    },
    "q5": {
      "title": "TokScript 仅适用于 TikTok 吗？",
      "answer": "不，TokScript 适用于多个平台，包括 TikTok、Instagram Reels 和 YouTube Shorts。我们的 AI 经过训练，能够理解每个平台的独特需求和观众偏好，生成优化的内容。"
    },
    "q6": {
      "title": "脚本是原创的吗？",
      "answer": "是的，TokScript 生成的所有脚本都是由我们的 AI 基于您的输入视频创建的原创内容。我们确保每个脚本都是独特的，并根据您的特定内容定制，帮助您保持真实性，同时节省内容创建时间。"
    },
    "q7": {
      "title": "下载字幕需要多长时间？",
      "answer": "视频字幕的下载时间取决于各种因素：互联网速度、字幕长度和视频文件的大小或长度。通常，获得视频字幕应该需要大约 5 到 10 秒。如果视频较长（5 分钟），完成可能需要约 30 秒。请注意，这些是近似时间，可能会因上述具体情况而异。"
    },
    "q8": {
      "title": "我如何下载 TikTok 视频字幕？",
      "answer": "我们让下载您的 TikTok 视频字幕变得简单，耗时最少。要下载您的 TikTok 视频字幕，您只需要您希望获得字幕的视频链接。转到您希望下载的 TikTok 视频，复制视频链接，然后将其粘贴到上面的输入字段中。这将允许您立即下载 TikTok 视频字幕！您可以通过转到分享图标并点击复制链接来获取此链接。现在只需将其粘贴到我们的网站上，就完成了！"
    },
    "q9": {
      "title": "我如何下载 Instagram Reels 视频字幕？",
      "answer": "为了下载您的 Instagram Reels 视频字幕，您只需要视频的链接。转到您希望下载的 Instagram Reels 视频，复制视频链接，然后将其粘贴到我们网站上的输入字段中。这将允许您立即下载 Instagram Reels 视频字幕！您可以通过转到分享图标并点击复制链接来获取此链接。现在只需将其粘贴到我们的网站上，就完成了！"
    },
    "q10": {
      "title": "我如何下载 YouTube Shorts 视频字幕？",
      "answer": "很简单！您只需转到您希望下载的 YouTube Shorts 视频，复制视频链接，然后将其粘贴到我们网站上的输入字段中。这将允许您立即下载 YouTube Shorts 视频字幕！您可以通过转到分享图标并点击复制链接来获取此链接。现在只需将其粘贴到我们的网站上，就完成了！"
    },
    "q11": {
      "title": "它显示没有字幕可下载，怎么回事？",
      "answer": "如果您收到此错误，这意味着您尝试获取转录的视频不存在。这与我们的网站无关，更多与您尝试下载的特定视频有关。仔细检查并确保视频中有说话内容，以便我们为您提取这些词语并下载它们！"
    },
    "q12": {
      "title": "它会从任何视频下载任何字幕吗？",
      "answer": "我们可以从 TikTok、YouTube Shorts 和 IG Reels 的任何视频下载任何字幕，只要有字幕可下载。如果您的视频中没有讲话，或创作者已禁用平台内的自动转录，我们将无法下载它们。别担心，大多数视频都启用了视频字幕，这种情况很少发生。"
    },
    "q13": {
      "title": "我是否需要拥有 TikTok、YouTube 或 Instagram 账户才能下载字幕？",
      "answer": "绝对不需要！您不需要 TikTok、Instagram 或 YouTube 账户来下载您的视频字幕。您只需要您想下载字幕的视频链接。只需将您的链接粘贴到此页面顶部的输入字段中，点击开始，我们会处理其余的！"
    },
    "q14": {
      "title": "我是否需要登录 TikTok、YouTube 或 Instagram 才能下载字幕？",
      "answer": "不需要。下载字幕时，您无需登录 TikTok、Instagram 或 YouTube。这使您可以快速轻松地使用，无论您身在何处或是否已登录。"
    },
    "q15": {
      "title": "我是否需要安装扩展来使用下载器？",
      "answer": "不需要。要保存您的视频字幕，您只需添加您的 TikTok、YouTube Shorts 或 Instagram Reels 视频的链接。只需将其粘贴到上面的输入字段中，下载您的视频字幕！"
    },
    "q16": {
      "title": "我如何获得链接来下载 TikTok、Instagram Reels 或 YouTube Shorts 字幕？",
      "answer": "要下载 YouTube Shorts、TikTok 视频和 IG Reels，很简单！您只需要视频的链接（在桌面和移动设备上都可用）。将其复制粘贴到我们的网站上，我们会处理其余的！这就是轻松下载任何视频字幕的方法！"
    },
    "q17": {
      "title": "我是否需要付费才能下载字幕？",
      "answer": "此网站 100% 免费供您使用。我们有一个付费订阅，可为您提供免费账户没有的 10 多个不同功能！如果您喜欢此工具，我们建议查看我们的其他工具和扩展，以实现更快的社交媒体增长和管理。我们支持并与所有浏览器（如 Google Chrome、Arc、Mozilla Firefox、Microsoft Edge、Safari 等）兼容！"
    },
    "q18": {
      "title": "是免费的吗？",
      "answer": "是的！TikTok、Instagram Reels 和 YouTube Shorts 提供免费视频字幕。这些字幕是使用自动语音识别技术创建的，因此可能不完全准确，但通常适合大多数目的。"
    }
  },
  "disclaimer": {
    "about": {
      "title": "关于 TokScript 免费视频字幕生成器",
      "paragraph1": "免费下载视频字幕（字幕）。立即，无需上传任何文件！快速简单。没有隐情。",
      "paragraph2": "在几秒钟内为您的 TikTok、Instagram Reels 和 YouTube Shorts 视频下载任何视频的字幕、转录文本和文字。添加您的视频链接，点击开始，立即在几秒钟内获得任何 TikTok、Reels 或 Shorts 视频脚本。非常适合 UGC 创作者、媒体购买者、广告专家、创作者和网红，他们需要帮助想出创意或了解视频",
      "paragraph3": "轻松快速地从您喜欢的 TikTok、YouTube Shorts 和 Instagram Reels 视频下载任何视频字幕！"
    },
    "tiktokAds": {
      "title": "TikTok 广告：",
      "content": "如果您在想出创意或需要了解视频在说什么时遇到困难，您现在可以轻松下载任何视频的字幕、字幕来轻松想出新创意或用于 SEO 和主题创建。"
    },
    "ugcCreators": {
      "title": "UGC 创作者：",
      "content": "如果您在确定视频中应该说什么时遇到困难，或只是想快速提醒您什么有效和什么无效，您现在可以下载任何转录字幕，并将其重新用于您可能拥有的任何未来视频创意。"
    },
    "ai": {
      "title": "AI：",
      "content": "轻松下载任何 TikTok、Reels 或 Shorts 视频的视频字幕和字幕，以便您可以将其与任何您喜欢的 AI 公司（如 ChatGPT、Bard、Claude 等）一起使用，轻松创建用户生成的视频脚本和您下一个视频的想法！"
    },
    "legal": {
      "title": "法律免责声明：",
      "content": "TokScript 不与 TikTok、TikTok USDS 合资企业有限责任公司、ByteDance、Instagram、Meta、YouTube 或 Google 有关、认可或赞助。所有商标均属于各自的所有者。"
    }
  },
  "footer": {
    "description": "最先进的 TikTok 转录工具。使用 AI 驱动的技术将您的视频转换为准确的字幕。",
    "generators": {
      "title": "生成器",
      "tiktok": "TikTok 字幕生成器",
      "instagram": "Instagram 字幕",
      "youtube": "YouTube Shorts 字幕"
    },
    "product": {
      "title": "产品",
      "features": "功能",
      "pricing": "定价",
      "api": "API",
      "integrations": "集成",
      "legal": "法律"
    },
    "company": {
      "title": "公司",
      "about": "关于",
      "contact": "联系",
      "privacy": "隐私",
      "terms": "条款",
      "helpCenter": "Featurebase 帮助中心"
    },
    "copyright": "© {year} TokScript。保留所有权利。",
    "cta": "免费开始使用"
  },
  "languages": {
    "en": "English",
    "pt": "Portuguese",
    "es": "Spanish",
    "zh": "Mandarin",
    "fr": "French",
    "hi": "Hindi",
    "ar": "Arabic",
    "de": "German",
    "ja": "Japanese",
    "ko": "Korean",
    "ru": "Russian"
  },
  "dontMissOutModal": {
    "title": "不要错过",
    "subtitle": "您只需一步就能解锁此功能。",
    "features": {
      "unlimitedTranscripts": "无限制字幕和批量下载",
      "unlimitedTranslations": "无限制翻译",
      "bulkImport": "一次批量导入 50 个视频链接",
      "reelsShorts": "Instagram Reels 和 YouTube Shorts（无限制）",
      "hdDownloads": "下载高清视频（无水印）加封面图片",
      "collections": "下载 TikTok 合集和播放列表",
      "chromeExtension": "具有所有专业功能的 Chrome 扩展",
      "quickUrl": "快速 URL 方法，只需添加 tokscript.com/",
      "exportFormats": "以多种格式导出.txt、.xml、.json、.csv"
    },
    "aiAgents": {
      "heading": "加上：解锁我们强大的 AI 工具",
      "unlimitedLabel": "无限制",
      "description": "创建爆款内容 - AI 训练于 20,000+ 爆款视频，提升您的影响力",
      "hookGenerator": {
        "title": "工具 #1：爆款开场白生成器",
        "cta": "生成",
        "description": "基于字幕主题创建爆款 TikTok 开场白"
      },
      "scriptWriter": {
        "title": "工具 #2：爆款脚本写手",
        "cta": "重写",
        "description": "将转录改写为更好的爆款脚本"
      },
      "viralityExplainer": {
        "title": "工具 #3：传播力解释器",
        "cta": "分析",
        "description": "解释爆款内容背后的心理学，创建新脚本"
      }
    },
    "ctaDashboard": "访问您的仪表板",
    "ctaUpgrade": "立即升级",
    "ctaSignUp": "注册并获取访问权限",
    "closeAlt": "关闭"
  },
  "checkoutOverlay": {
    "login": {
      "title": "欢迎回来",
      "subtitle": "您的字幕正在等待您。",
      "feature1": "即时访问",
      "feature1Detail": "从您离开的地方继续",
      "feature2": "同步的库",
      "feature2Detail": "您保存的所有字幕",
      "feature3": "AI 工具已就绪",
      "feature3Detail": "创建您的下一个爆款",
      "trustText": "受 {count} 个用户信任",
      "userCount": "+41K"
    },
    "signup": {
      "orderSummary": "订单摘要",
      "trustText": "加入 41,000 多个使用 TokScript 的用户"
    },
    "form": {
      "createAccount": "创建您的账户",
      "welcomeBack": "欢迎回来",
      "step1of2": "步骤 1（共 2 步）",
      "loginSubtitle": "输入您的详情以访问您的工作区。",
      "signupSubtitle": "为您的",
      "emailLabel": "电子邮件",
      "emailPlaceholder": "name@example.com",
      "passwordLabel": "密码",
      "forgotPassword": "忘记了？",
      "passwordPlaceholderLogin": "输入您的密码",
      "passwordPlaceholderSignup": "创建密码",
      "signIn": "登录",
      "continue": "继续",
      "or": "或",
      "continueWithGoogle": "使用 Google 继续",
      "noAccount": "没有账户？",
      "signUp": "注册",
      "hasAccount": "已有账户？",
      "signInLink": "登录",
      "secureCheckout": "安全的 256 位加密结账"
    },
    "validation": {
      "invalidEmail": "无效的电子邮件地址",
      "emailRequired": "电子邮件是必需的",
      "passwordMinLength": "密码必须至少 6 个字符。",
      "passwordRequired": "密码是必需的。"
    },
    "toasts": {
      "loginSuccess": "登录成功！",
      "accountCreated": "账户创建成功！正在您登录...",
      "accountCreatedSignIn": "账户已创建！请登录。",
      "loginError": "电子邮件或密码无效。请检查您的凭据并重试。",
      "registrationError": "注册过程中出了问题。请重试。"
    },
    "freeCheckout": {
      "tiktokOnly": "仅 TikTok",
      "chromeExtensionFree": "Chrome 扩展（免费功能）"
    }
  },
  "confirmationModal": {
    "paragraph1": "您即将升级您的订阅计划。这将为您提供对高级功能和优势的访问权限。",
    "paragraph2": "请注意，您将按照新计划进行收费。",
    "paragraph3": "您确定要继续升级吗？",
    "cancel": "取消",
    "upgrade": "升级"
  },
  "toast": {
    "subscriptionUpdated": "订阅已成功更新",
    "subscriptionError": "更新订阅时出错",
    "checkoutError": "无法启动结账。请重试。",
    "failedToFetch": "获取视频数据失败"
  }
}

# Write to file
with open('locales/zh.json', 'w', encoding='utf-8') as f:
    json.dump(translations, f, ensure_ascii=False, indent=2)

print("Successfully created zh.json")

# Validate
try:
    with open('locales/zh.json', 'r', encoding='utf-8') as f:
        json.load(f)
    print("JSON validation: PASSED")
except Exception as e:
    print(f"JSON validation: FAILED - {e}")

