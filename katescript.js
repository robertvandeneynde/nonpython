var katescript = {
    "name": "Stuffing",
    "author": "Robert Vanden Eynde <robertvandeneynde@hotmail.com>",
    "license": "BSD License",
    "revision": 1,
    "kate-version": "5.1",
    "type": "commands",
    "functions": [
        "replaceMultiple",
        "replaceForAllNotation",
        "replaceLatex",
        "replaceNbsp",
        "replaceLt",
        "replaceHtml",
        "columnAlign",
        "formatJson",
        "formatMarkdown",
        "expandSelection",
        "encloseSingleComment",
        "camelCaseToUnderscore",
        "underscoreToCamelCase",
        "replaceShow",
        "makeLink",
        "makeTrans",
        "makepmatrix",
        "makeBlockTrans",
        "makeSelfTranslation",
        "insertFrenglishSemicolon",
        "makeSelfTranslationNoSpace",
        "makeSelfTranslationTwoLines",
        "enclose",
        "encloseSave",
        "makeStrong",
        "makeCode",
        "makeEm",
        "mimetype",
        "arrayToLatexMatrix",
        "encloseCustom",
        "saveEnclose",
        "xorEncode",
        "encloseHtml",
        "encloseHtmlKeyboard",
        "encloseHtmlKbd",
        "ipafrench",
        "htmlMarklines",
        "htmlKeyboard",
        "htmlEnclose",
        "selectLine",
    ""],
    "actions": [
        {
            "function": "replaceNbsp",
            "name": "Replace nbsp; occurence by unicode character U+00A0",
            "category": "Replace",
            "interactive": false,
            "icon": "",
            "shortcut": ""
        },
        {
            "function": "replaceMultiple",
            "name": "replaceMultiple",
            "category": "Replace",
            "interactive": true
        },
        {
            "function": "replaceForAllNotation",
            "name": "replaceForAllNotation",
            "category": "Replace"
        },
        {
            "function": "replaceLatex",
            "name": "replaceLatex",
            "category": "Replace"
        },
        {
            "function": "replaceHtml",
            "name": "replaceHtml",
            "category": "Replace"
        },
        {
            "function": "replaceHtml",
            "name": "htmlReplace",
            "category": "Replace/alias"
        },
        {
            "function": "formatJson",
            "name": "formatJson",
            "category": "Replace"
        },
        {
            "function": "formatMarkdown",
            "name": "formatMarkdown",
            "category": "Replace"
        },
        {
            "function": "columnAlign",
            "name": "columnAlign",
            "category": "Align"
        },
        {
            "function": "expandSelection",
            "name": "expandSelection",
            "category": "Selection"
        },
        {
            "function": "selectLine",
            "name": "selectLine",
            "category": "Selection"
        },
        {
            "function": "makeEm",
            "name": "makeEm",
            "category": "Divers"
        },
        {
            "function": "makeStrong",
            "name": "makeStrong",
            "category": "Divers"
        },
        {
            "function": "makeCode",
            "name": "makeCode",
            "category": "Divers"
        },
        {
            "function": "makeLink",
            "name": "makeLink",
            "category": "Divers"
        },
        {
            "function": "camelCaseToUnderscore",
            "name": "camelCaseToUnderscore",
            "category": "Enclose"
        },
        {
            "function": "makeBlockTrans",
            "name": "makeBlockTrans",
            "category": "Enclose"
        },
        {
            "function": "makeSelfTranslation",
            "name": "makeSelfTranslation",
            "category": "Enclose"
        },
        {
            "function": "encloseHtml",
            "name": "encloseHtml",
            "category": "Enclose",
            "interactive": true
        },
        {
            "function": "encloseHtmlKbd",
            "name": "encloseHtmlKbd",
            "category": "Enclose"
        },
        {
            "function": "insertFrenglishSemicolon",
            "name": "insertFrenglishSemicolon",
            "category": "Insert"
        },
        {
            "function": "makeSelfTranslationNoSpace",
            "name": "makeSelfTranslationNoSpace",
            "category": "Enclose"
        },
        {
            "function": "makeSelfTranslationTwoLines",
            "name": "makeSelfTranslationTwoLines",
            "category": "Enclose"
        },
        {
            
            "function": "enclose",
            "name": "enclose",
            "category": "Enclose"
        },
        {
            
            "function": "encloseCustom",
            "name": "encloseCustom",
            "category": "Enclose"
        },
    {}]
}; // kate-script header, must be at the start of the file as a valid JSON object (therefore without comments)

// http://www.kate-editor.org/doc/advanced-editing-tools-scripting.html#advanced-editing-tools-scripting-api
// http://kate-editor.org/2009/10/29/extending-kate-with-scripts/
// https://docs.kde.org/trunk5/en/applications/katepart/dev-scripting.html

require("cursor.js")
require("range.js")
require("underscore.js")

function fmap(f, L) {
    return _.map(L, f)
}

function starmap(L, f) {
    return _.map(L, function(t) {
        return f.apply(this, t)
    })
}

function fstarmap(f, L) {
    return starmap(L, f)
}


var allSubstitutes = {
    forall: [
        ["forall",       "∀"],
        ["for",          "∀"],
        
        ["exist",        "∃"],
        ["exists",       "∃"],
        ["it exists",    "∃"],
        ["there exists", "∃"],
        ["nexists",      "∄"],
        ["not exists",   "∄"],
        ["!exists",      "∄"],
        ["/exists",      "∄"],
        
        ["=>",           "⇒"],
        ["<=>",          "⇔"],
        
        ["cong",         "≡"],
        ["congr",        "≡"],
        ["congruent",    "≡"],
                        
        ["in",           "∈"],
        ["contains",     "∋"],
        ["owns",         "∋"],
        
        ["not in",       "∉"],
        ["!in",          "∉"],
        ["/in",          "∉"],
                        
        ["not contains", "∌"],
        ["!contains",    "∌"],
        ["/contains",    "∌"],
        
        ["not owns",     "∌"],
        ["!owns",        "∌"],
        ["/owns",        "∌"],
        
        ["emptyset",     "∅"],
        
        ["subset",       "⊃"],
        ["supset",       "⊂"],
        ["subseteq",     "⊆"],
        ["supseteq",     "⊇"],
        
        ["set<",         "⊂"],
        ["set>",         "⊃"],
        ["set<=",        "⊆"],
        ["set>=",        "⊇"],
                        
        ["and",          "∧"],
        ["wedge",        "∧"],
                        
        ["or",           "∨"],
        ["vee",          "∨"],
        
        ["union",        "∪"],
        ["cup",          "∪"],
                        
        ["inter",        "∩"],
        ["intersection", "∩"],
        ["cap",          "∩"],
        
        ["big and",          "⋀"],
        ["big wedge",        "⋀"],
                        
        ["big or",           "⋁"],
        ["big vee",          "⋁"],
                        
        ["big union",        "⋃"],
        ["big cup",          "⋃"],
        
        ["big inter",        "⋂"],
        ["big intersection", "⋂"],
        ["big cap",          "⋂"],
        
        ["<=",    "≤"],
        [">=",    "≥"],
        ["!=",    "≠"],
        
        ["===",   "≡"],
        ["!==",   "≢"],
        ["!===",  "≢"],
    ],
    // http://milde.users.sourceforge.net/LUCR/Math/unimathsymbols.xhtml
    latex: fstarmap(function(x,y) { return ["\\\\" + x, y] }, [
        ["forall",  "∀"],
        ["exists",  "∃"],
        ["nexists", "∄"],
        
        ["in",      "∈"],
        ["owns",    "∋"],
        ["ni",      "∋"],
        ["notin",   "∉"],
        ["notni",   "∌"],
        ["notowns", "∌"],
        
        ["subset",  "⊃"],
        ["supset",  "⊂"],
        ["subseteq","⊆"],
        ["supseteq","⊇"],
        
        ["wedge",   "∧"],
        ["vee",     "∨"],
        
        ["cup",     "∪"],
        ["cap",     "∩"],
        
        ["sqrt",    "√"],
        
        ["bigwedge","⋀"],
        ["bigvee",  "⋁"],
        
        ["bigcup",  "⋃"],
        ["bigcap",  "⋂"],
        
        ['perp',    '⊥'],
        ['bot',     '⊥'],
        ['top',     '⊤'],
                       
        ["times",   "×"], // \u00D7
        ["cdot",    "⋅"], // \u22C5
        
        ["leq",    "≤"],
        ["geq",    "≥"],
        ["neq",    "≠"],
        ["equiv",  "≡"],
        ["nequiv", "≢"],
        ["approx", "≈"],
    
        ["alpha",   "α"],
        ["Alpha",   "Α"],
        ["beta",    "β"],
        ["Beta",    "Β"],
        ["gamma",   "γ"],
        ["Gamma",   "Γ"],
        ["delta",   "δ"],
        ["Delta",   "Δ"],
        ["epsilon", "ε"],
        ["Epsilon", "Ε"],
        ["zeta",    "ζ"],
        ["Zeta",    "Ζ"],
        ["eta",     "η"],
        ["Eta",     "Η"],
        ["theta",   "θ"],
        ["Theta",   "Θ"],
        ["iota",    "ι"],
        ["Iota",    "ι"],
        ["kappa",   "κ"],
        ["Kappa",   "Κ"],
        ["lambda",  "λ"],
        ["pi",      "π"],
        ["Pi",      "Π"],
        ["Lambda",  "Λ"],
        ["mu",      "μ"],
        ["Mu",      "Μ"],
        ["nu",      "ν"],
        ["Nu",      "Ν"],
        ["rho",     "ρ"],
        ["Rho",     "Ρ"],
        ["sigma",   "σ"],
        ["Sigma",   "Σ"],
        ["tau",     "τ"],
        ["Tau",     "Τ"],
        ["upsilon", "υ"],
        ["Upsilon", "Υ"],
        ["khi",     "χ"],
        ["Khi",     "Χ"],
        ["psi",     "ψ"],
        ["Psi",     "Ψ"],
        ["phi",     "φ"],
        ["Phi",     "U"],
        ["ksi",     "ξ"],
        ["Ksi",     "Ξ"],
        ["omega",   "ω"],
        ["Omega",   "Ω"] 
    ]),
    nbsp:[
        ["&nbsp;", " "],
    ],
    lt:[
        ["<", "&lt;"],
    ],
    html: fstarmap(function(x, y) { return ["&" + x + ";", y] }, [
        ['amp',      '&'],     
        ['lt',       '<'],     
        ['gt',       '>'],     
        ['Agrave',   'À'],     
        ['Aacute',   'Á'],     
        ['Acirc',    'Â'],     
        ['Atilde',   'Ã'],     
        ['Auml',     'Ä'],     
        ['Aring',    'Å'],     
        ['AElig',    'Æ'],     
        ['Ccedil',   'Ç'],     
        ['Egrave',   'È'],     
        ['Eacute',   'É'],     
        ['Ecirc',    'Ê'],     
        ['Euml',     'Ë'],     
        ['Igrave',   'Ì'],     
        ['Iacute',   'Í'],     
        ['Icirc',    'Î'],     
        ['Iuml',     'Ï'],     
        ['ETH',      'Ð'],     
        ['Ntilde',   'Ñ'],     
        ['Ograve',   'Ò'],     
        ['Oacute',   'Ó'],     
        ['Ocirc',    'Ô'],     
        ['Otilde',   'Õ'],     
        ['Ouml',     'Ö'],     
        ['Oslash',   'Ø'],     
        ['Ugrave',   'Ù'],     
        ['Uacute',   'Ú'],     
        ['Ucirc',    'Û'],     
        ['Uuml',     'Ü'],     
        ['Yacute',   'Ý'],     
        ['THORN',    'Þ'],     
        ['szlig',    'ß'],     
        ['agrave',   'à'],     
        ['aacute',   'á'],     
        ['acirc',    'â'],     
        ['atilde',   'ã'],     
        ['auml',     'ä'],     
        ['aring',    'å'],     
        ['aelig',    'æ'],     
        ['ccedil',   'ç'],     
        ['egrave',   'è'],     
        ['eacute',   'é'],     
        ['ecirc',    'ê'],     
        ['euml',     'ë'],     
        ['igrave',   'ì'],     
        ['iacute',   'í'],     
        ['icirc',    'î'],     
        ['iuml',     'ï'],     
        ['eth',      'ð'],     
        ['ntilde',   'ñ'],     
        ['ograve',   'ò'],     
        ['oacute',   'ó'],     
        ['ocirc',    'ô'],     
        ['otilde',   'õ'],     
        ['ouml',     'ö'],     
        ['oslash',   'ø'],     
        ['ugrave',   'ù'],     
        ['uacute',   'ú'],     
        ['ucirc',    'û'],     
        ['uuml',     'ü'],     
        ['yacute',   'ý'],     
        ['thorn',    'þ'],     
        ['yuml',     'ÿ'],     
        ['nbsp',     '\u00a0'],
        ['iexcl',    '¡'],     
        ['cent',     '¢'],     
        ['pound',    '£'],     
        ['curren',   '¤'],     
        ['yen',      '¥'],     
        ['brvbar',   '¦'],     
        ['sect',     '§'],     
        ['uml',      '¨'],     
        ['copy',     '©'],     
        ['ordf',     'ª'],     
        ['laquo',    '«'],     
        ['not',      '¬'],     
        ['shy',      '\u00ad'],
        ['reg',      '®'],     
        ['macr',     '¯'],     
        ['deg',      '°'],     
        ['plusmn',   '±'],     
        ['sup2',     '²'],     
        ['sup3',     '³'],     
        ['acute',    '´'],     
        ['micro',    'µ'],     
        ['para',     '¶'],     
        ['cedil',    '¸'],     
        ['sup1',     '¹'],     
        ['ordm',     'º'],     
        ['raquo',    '»'],     
        ['frac14',   '¼'],     
        ['frac12',   '½'],     
        ['frac34',   '¾'],     
        ['iquest',   '¿'],     
        ['times',    '×'],     
        ['divide',   '÷'],     
        ['forall',   '∀'],     
        ['part',     '∂'],     
        ['exist',    '∃'],     
        ['empty',    '∅'],     
        ['nabla',    '∇'],     
        ['isin',     '∈'],     
        ['notin',    '∉'],     
        ['ni',       '∋'],     
        ['prod',     '∏'],     
        ['sum',      '∑'],     
        ['minus',    '−'],     
        ['lowast',   '∗'],     
        ['radic',    '√'],     
        ['prop',     '∝'],     
        ['infin',    '∞'],     
        ['ang',      '∠'],     
        ['and',      '∧'],     
        ['or',       '∨'],     
        ['cap',      '∩'],     
        ['cup',      '∪'],     
        ['int',      '∫'],     
        ['there4',   '∴'],     
        ['sim',      '∼'],     
        ['cong',     '≅'],     
        ['asymp',    '≈'],     
        ['ne',       '≠'],     
        ['equiv',    '≡'],     
        ['le',       '≤'],     
        ['ge',       '≥'],     
        ['sub',      '⊂'],     
        ['sup',      '⊃'],     
        ['nsub',     '⊄'],     
        ['sube',     '⊆'],     
        ['supe',     '⊇'],     
        ['oplus',    '⊕'],     
        ['otimes',   '⊗'],     
        ['perp',     '⊥'],     
        ['sdot',     '⋅'],     
        ['Alpha',    'Α'],     
        ['Beta',     'Β'],     
        ['Gamma',    'Γ'],     
        ['Delta',    'Δ'],     
        ['Epsilon',  'Ε'],     
        ['Zeta',     'Ζ'],     
        ['Eta',      'Η'],     
        ['Theta',    'Θ'],     
        ['Iota',     'Ι'],     
        ['Kappa',    'Κ'],     
        ['Lambda',   'Λ'],     
        ['Mu',       'Μ'],     
        ['Nu',       'Ν'],     
        ['Xi',       'Ξ'],     
        ['Omicron',  'Ο'],     
        ['Pi',       'Π'],     
        ['Rho',      'Ρ'],     
        ['Sigma',    'Σ'],     
        ['Tau',      'Τ'],     
        ['Upsilon',  'Υ'],     
        ['Phi',      'Φ'],     
        ['Chi',      'Χ'],     
        ['Psi',      'Ψ'],     
        ['Omega',    'Ω'],     
        ['alpha',    'α'],     
        ['beta',     'β'],     
        ['gamma',    'γ'],     
        ['delta',    'δ'],     
        ['epsilon',  'ε'],     
        ['zeta',     'ζ'],     
        ['eta',      'η'],     
        ['theta',    'θ'],     
        ['iota',     'ι'],     
        ['kappa',    'κ'],     
        ['lambda',   'λ'],     
        ['mu',       'μ'],     
        ['nu',       'ν'],     
        ['xi',       'ξ'],     
        ['omicron',  'ο'],     
        ['pi',       'π'],     
        ['rho',      'ρ'],     
        ['sigmaf',   'ς'],     
        ['sigma',    'σ'],     
        ['tau',      'τ'],     
        ['upsilon',  'υ'],     
        ['phi',      'φ'],     
        ['chi',      'χ'],     
        ['psi',      'ψ'],     
        ['omega',    'ω'],     
        ['thetasym', 'ϑ'],     
        ['upsih',    'ϒ'],     
        ['piv',      'ϖ'],     
        ['OElig',    'Œ'],     
        ['oelig',    'œ'],     
        ['Scaron',   'Š'],     
        ['scaron',   'š'],     
        ['Yuml',     'Ÿ'],     
        ['fnof',     'ƒ'],     
        ['circ',     'ˆ'],     
        ['tilde',    '˜'],     
        ['ensp',     '\u2002'],
        ['emsp',     '\u2003'],
        ['thinsp',   '\u2009'],
        ['zwnj',     '\u200c'],
        ['zwj',      '\u200d'],
        ['lrm',      '\u200e'],
        ['rlm',      '\u200f'],
        ['ndash',    '–'],     
        ['mdash',    '—'],     
        ['lsquo',    '‘'],     
        ['rsquo',    '’'],     
        ['sbquo',    '‚'],     
        ['ldquo',    '“'],     
        ['rdquo',    '”'],     
        ['bdquo',    '„'],     
        ['dagger',   '†'],     
        ['Dagger',   '‡'],     
        ['bull',     '•'],     
        ['hellip',   '…'],     
        ['permil',   '‰'],     
        ['prime',    '′'],     
        ['Prime',    '″'],     
        ['lsaquo',   '‹'],     
        ['rsaquo',   '›'],     
        ['oline',    '‾'],     
        ['euro',     '€'],     
        ['trade',    '™'],     
        ['larr',     '←'],     
        ['uarr',     '↑'],     
        ['rarr',     '→'],     
        ['darr',     '↓'],     
        ['harr',     '↔'],     
        ['crarr',    '↵'],     
        ['lceil',    '⌈'],     
        ['rceil',    '⌉'],     
        ['lfloor',   '⌊'],     
        ['rfloor',   '⌋'],     
        ['loz',      '◊'],     
        ['spades',   '♠'],     
        ['clubs',    '♣'],     
        ['hearts',   '♥'],     
        ['diams',    '♦'],     
        ['lceil',    '⌈'],     
        ['rceil',    '⌉'],     
        ['lfloor',   '⌊'],     
        ['rfloor',   '⌋'],     
        ['loz',      '◊'],     
        ['spades',   '♠'],     
        ['clubs',    '♣'],     
        ['hearts',   '♥'],     
        ['diams',    '♦']      
    ]),
};

_.each(allSubstitutes, function(list) {
    _.sortBy(list, '0')
    list.reverse()
})

// Q = {q_i ∀ x ∈ Q} ∪ {q_s, q_e}
// Q = {q_i ∀ x ∈ Q} ∪ {q_s, q_e}
// A = B ⋂ C
// (A ∪ B) ⋂ C == A ∧ C ∪ B ⋂ C
// (A ∧ B) ∨ C == A ⋂ C
// (A ∪ B) ⋂ C == A ∧ C ∪ B ⋂ C
// (A ∧ B) ∨ C == A 


function replaceShow(name) {
    var cursor = view.cursorPosition();
    if(name) {
        document.editBegin()
        _.each(allSubstitutes[name], function(x) {
            var regex = x[0];
            var symbol = x[1];
            document.insertLine(cursor.line, symbol + ' '+ regex)
            cursor.setPosition(cursor.line + 1, cursor.column)
        })
        document.editEnd()
    }
    else {
        _.each(_.keys(allSubstitutes), function(x){
            document.editBegin()
            document.insertLine(cursor.line, '--- ' + x + ' ---')
            cursor.setPosition(cursor.line + 1, cursor.column)
            document.editEnd()
            replaceShow(x)
        })
    }
}

function replaceMultiple(name) {
    var cursor = view.cursorPosition();
    var selectionRange = view.selection()
    
    if(! selectionRange.isValid()) {
        selectionRange = new Range(
            new Cursor(cursor.line, 0),
            new Cursor(cursor.line, document.lineLength(cursor.line))
        )
    }
    
    var textInSelection = document.text(selectionRange); // may be '' // document.text(view.selection()) == view.selectedText()
    
    var newTextInSelection = ''
    for(var i = 0; i < textInSelection.length; ) {
        var match = false;
        _.each(allSubstitutes[name], function(subs) {
            var reg = new RegExp("^" + subs[0]);
            var m = reg.exec(textInSelection.substr(i))
            if(m != null) {
                newTextInSelection += subs[1]
                i += m[0].length
                match = true;
            }
        })
        if(! match) {
            newTextInSelection += textInSelection[i]
            i++;
        }
    }
    
    /*
    var newTextInSelection = _.reduce(allSubstitutes[name], function (acc, subs) {
        return acc.replace(new RegExp(subs[0], 'g'), subs[1])
    }, textInSelection)
    */
    
    document.editBegin()
    document.removeText(selectionRange)
    document.insertText(selectionRange.start, newTextInSelection)
    document.editEnd()
}

function _zfill(s, n, carac) {
    if(carac == null)
        carac = "0"
    while(s.length < n)
        s = carac + s
    return s
}

function _rzfill(s, n, carac) {
    if(carac == null)
        carac = "0"
    while(s.length < n)
        s += carac
    return s
}

function _strTimes(s, n) {
    return _zfill('', n * s.length, s)
}

/**
 * Hello world how are you ->   ['Hello', 'world', 'how', 'are', 'you']
 * Hello world "how are" you -> ['Hello', 'world', '"how are"', 'you']
 */
function splitWhitespaceGuillements(line) {
    // return line.trim().split(/\s+/);
    var placeholder = '%%'
    while(line.search(placeholder) != -1)
        placeholder += placeholder
    
    var parts = line.trim().split("\"");
    var rep = ""
    for(var i = 0; i < parts.length; i += 2) {
        rep += parts[i];
        if(parts[i+1] != undefined)
            rep += placeholder;
    }
    
    var res = rep.split(/\s+/)
    var n = 1;
    for(var i = 0; i < res.length; i++) {
        while(res[i].search(placeholder) != -1) {
            res[i] = res[i].replace(placeholder, '"' + parts[n] + '"')
            n += 2
        }
    }
    return res
}

function columnAlign(/* ...args */) {
    var args = 0 < arguments.length ? [].slice.call(arguments, 0) : [];
    var widths = _(args).map(function(x) {
        var int = parseInt(x, 10)
        return _.isNaN(int) ? undefined : int;
    })
    
    replaceTotalLines(function(lines) {
        /*var data = _.map(lines, function(line) {
            return [
                /(\s*)/.exec(line)[1],
                line.trim().split(/\s+/)
            ]
        })
        
        var indentationBegin = _.map(data, '0')
        var realLines        = _.map(data, '1')*/
        
        var indentationBegin = _.map(lines, function(line) {
            return /(\s*)/.exec(line)[1]
        })
        
        // indentationBegin[lineNumber] = '   ' for example (spaces at the beginning)
        
        var realLines = _.map(lines, splitWhitespaceGuillements);
        
        var realWidths = []

        // python   : [0] * max(array.length for lines in realLines)
        // python   : [0 for i in range(max(array.length for lines in realLines))]
        // python   : [0 for i in range(max(map(getter('length'), realLines))]
        // _        : _.map(_.range(_.max(_.map(realLines, 'length'))), _.constant(0))
        // _        : _.map(_.range(_.chain(realLines).map('length').max().value(), _.constant(0))
        // coffee _ : _.map _.range(_.max _.map realLines, 'length'), _.constant(0)
        // coffee _ : _.map (_.range _.max _.map realLines, 'length'), _.constant(0)
        // coffee _ : (0 for i in _.range(_.max _.map realLines, 'length'))
        // coffee _ : (0 for i in _.range _.max(array.length for lines in realLines))
        
        _.each(realLines, function(array){
            _.each(array, function(v,c) {
                if(realWidths[c] == undefined)
                    realWidths[c] = 0
                realWidths[c] = Math.max(realWidths[c], v.length)
            })
        })
        
        realWidths = _.map(realWidths, function(w,c){
            return widths[c] == undefined ? w : widths[c]
        })
        
        return _.map(realLines, function(line, n){
            return indentationBegin[n] + _.map(line, function(s,c) {
                return _rzfill(s, realWidths[c], " ")
            }).join(' ')
        })
    }) 
}

function replaceForAllNotation() {
    replaceMultiple('forall')
}

function replaceLatex() {
    replaceMultiple('latex')
}

function replaceHtml() {
    replaceMultiple('html')
}

function replaceNbsp() {
    replaceMultiple('nbsp')
}

function replaceLt() {
    replaceMultiple('lt')
}

/**
 * Encode the selection using ascii key key 
 * Replace the solution by a hexbytestring
 */
function xorEncode(key) {
    
}

/**
 * @deprecatd
 */
function action(cmd)
{
    if(_.contains(["replaceMultiple"],  cmd))
        return // pas d'action

    return {
        icon: "",
        shortcut: "",
        interactive: false,
        
        // expression _.map(_.find(tab, f1), f2)
        // <==> _.map<_,f2>(_.find<_, f1>(tab)) // in partial notation
        // <==> _.compose(_.map<_,f2>, _.find<_, f1>)(tab) // in partial notation
        // <==> _.compose(_.partial(_.map, _, f2), _.partial(_.find, _, f1))(tab) // with partial notation expanded
        category: (function(found) {
            return found == null ? cmd : found.to
        })(_.find(
            [
                {
                    from: 'replaceMultiple replaceForAllNotation replaceLatex replaceHtml formatJson',
                    to: i18n('Replace')
                }, {
                    from: 'columnAlign',
                    to: i18n('Align')
                }, {
                    from: 'expandSelection',
                    to: i18n('Expand selection')
                }
            ], function(s) {
                return _.contains(s.from.split(' '), cmd)
            }
        )),
        
        text: {
            replaceMultiple: i18n("Replace multiple : forall, latex..."),
            replaceForAllNotation: i18n("forall, in, inter... -> ∀, ∈, ⋂"),
            replaceLatex: i18n("latex : \\alpha, \\wedge, \\times... -> α, ∧, ×"),
            replaceHtml: i18n("replace html entities like &nbsp; &mdash; &euro; ..."),
            formatJson: i18n("Format Json"),
        }[cmd] || cmd
    }
}

function help(cmd) {
    return '(' + cmd + ') ' + (function() {
        if(cmd.substr(0, "replace".length) == "replace") {
            var id = {
                ForAllNotation: "forall",
                Latex: "latex",
                Html: "html",
            }[cmd.substr("replace".length)];
            
            if(id && allSubstitutes[id])
                return "<table>" + _.map(allsubstitutes, function(s){
                    return "<tr><td>" + s[0] + " </td><td> " + s[1] + "</td></tr>"
                }).join('\n') + "</table>"
        }
        
        return {
            replaceMultiple: "Replace multiple : <br/>From left to right<br/>Possible parameters : " + _.keys(allSubstitutes).join(', '),
            saveEnclose: 'Select a text containing %%, for example "<a>%%</a>", further call to encloseCustom will use the separators saved, here <a> and </a>',
            encloseCustom: 'Enclose the selection with saved parameters, see saveEnclose',
            columnAlign: "Align selection in columns using spaces."+
                "<h3>Simple example:</h3>" + 
                "<h4>Before:</h4>" +
                "<table><tr><td>123456 123 1</td></tr><tr><td>123 123 123</td></tr><tr><td>1 1234 1</td></tr></table>" + 
                "<h4>After:</h4>" +
                "<table>" +
                "  <tr> <td>123456</td> <td>123</td>  <td>1</td>   </tr> "         +
                "  <tr> <td>123</td>    <td>123</td>  <td>123</td> </tr> "         +
                "  <tr> <td>1</td>      <td>1234</td> <td>1</td>   </tr> </table>" +
                "<h3>Example with quotes:</h3>" +
                "<h4>Before:</h4>" +
                "<table><tr><td>123456 \"123 1\" 0</td></tr><tr><td>123 123 123</td></tr><tr><td>1 1234 1</td></tr></table>" + 
                "<h4>After:</h4>" +
                "<table>" +
                "  <tr> <td>123456</td> <td>\"123 1\"</td>  <td>0</td>   </tr> "         +
                "  <tr> <td>123</td>    <td>123</td>  <td>123</td> </tr> "         +
                "  <tr> <td>1</td>      <td>1234</td> <td>1</td>   </tr> </table>",
            formatJson:"Format the selected text as json",
            expandSelection: "Expand the selection to lines",
            encloseSingleComment: "Adds /////// to the top and bottom of the selected line",
            ipafrench: 'Transform french sound to ipa. Eg. "â" to ɑ, "in" to ɛ̃, "ou" to u. If selection, consider selection to be a list of space separated symbol. If no selection, consider that the last characters typed are one of the sound. For a complete list of souns available, see source code.',
        }[cmd] || ''
    })();
}

function getIndent(str) {
    return /^(\s*)/.exec(str)[0] // always match
}

function encloseSingleComment() {
    var DATA = {
        "application/javascript": "//",
        "text/x-cpp": "//",
        "text/x-c": "//",
        "text/x-java": "//",
        "text/x-python": "#",
        "application/x-shellscript": "#",
        "text/x-tex": "%",
    }
    var comment = DATA[document.mimeType()] || "#"
    replaceTotalLines(function(lines) {
        var m = _.min(_.map(lines, function(line) {
            return getIndent(line).length
        }))
        var t = _.max(_.map(lines, function(line) {
            return line.trim().length
        }))
        var full = _strTimes(' ', m) + _zfill('', t, comment)
        return [full].concat(lines).concat([full])
    })
}

function formatJson() {
    replaceText(function(text) {
        // TODO look at the preferred tab policy for JSON
        return JSON.stringify(JSON.parse(text), null, "    ")
    })
}

function formatMarkdown() {
    if(isLatex()) {
        var bold = ['\\textbf{', '}']
        var ital = ['\\emph{', '}']
    } else if(isHtml() || true) {
        var bold = ['<strong>', '</strong>']
        var ital = ['<em>', '</em>']
    }
    
    replaceText(function(text) {
        return text.replace(/[*][*](.*?)[*][*]|__(.*?)__/g, function(sub, group1, group2, i, string){
            var group = group1 || group2
            return bold[0] + group + bold[1]
        }).replace(/[*](.*?)[*]|_(.*?)_/g, function(sub, group1, group2, i, string){
            var group = group1 || group2
            return ital[0] + group + ital[1]
        }).replace(/\[(.*?)\]\((.*?)\)/g, function(sub, group1, group2, i, string){ return '<a href="' + group2 + '">' + group1 + '</a>' })
    })
}

function expandSelection() {
    view.setSelection(_expandedSelection())
}

function selectLine() {
    view.setSelection(_smartLineSelection())
}

/* Here is an example for all the replaceLines functions.
 * The first character of the file is "<"
 * The last one is ">"

<html>
<body>
<p> {{<ul>
    <li>A li</li>
    <li>Another li</li>
    <li>
        <ol>
            <li>One</li>
            <li>Two</li>
            <li>Three</li>
        </ol>
    </li>

</ul>}} </p>
</html>
 
 **/

function _expandedSelection(selection) {
    if(selection == null)
        selection = view.selection()
        
    if(! selection.isValid())
        return selection
    
    return new Range(
        selection.start.line, 0,
        selection.end.line, document.lineLength(selection.end.line))
}

function _smartLineSelection(selection) {
    if(selection == null)
        selection = view.selection()
        
    if(! selection.isValid())
        return selection
    
    if(selection.start.line != selection.end.line)
        return _expandedSelection()
    
    var l = selection.start.line
    return new Range(
        l, document.firstChar(l), // Since KDE 4.9 // Returns the first character that's not a whitespace // https://docs.kde.org/trunk5/en/applications/katepart/dev-scripting.html
        l, document.lastChar(l))  // Since KDE 4.9 // Returns the last character that's not a whitespace  // https://docs.kde.org/trunk5/en/applications/katepart/dev-scripting.html
}

function _resultToString(f_x) {
    if(_.isArray(f_x)) {
        return f_x.join("\n")
    } else if(_.isString(f_x)) {
        return f_x
    } else {
        throw new Exception("callback function for each has to return string or array of lines");
    }
}

function _translateSelection(selection, func) {
    var text = document.text(selection);
    return _resultToString(func(text.split("\n")))
}

function _translateSelectionText(selection, func) {
    var text = document.text(selection)
    return _resultToString(func(text))
}

function _replaceSelection(selection, text) {
    view.clearSelection();

    document.editBegin();
    document.removeText(selection);
    document.insertText(selection.start, text);
    document.editEnd();
}

/* Call the replace function with the total the lines : not looking at selection columns.
 * In the example, the <p></p> will be included

 * Same effect as

replaceTotalText(function(text){
    return func(text.split("\n"))
}

*/
function replaceTotalLines(func) {
    replaceTotalText(function(text) { return func(text.split("\n")) })
}

/* Call a replace function with all the lines without the input outside the selection
 * In the example the <p></p> tags will not be included

 * Same effect as

replaceText(function(text){
    return func(text.split("\n"))
}

*/
function replaceLines(func) {
    replaceText(function(text) { return func(text.split("\n")) })
}

/* Call a replace function with the selected text expanded to the full begin/end line.
 * In the example The <p></p> will be included

 * Same effect as

replaceTotalLines(function(lines){
    return func(lines.join("\n"))
}

*/
function replaceTotalText(func) {
    var selection = _expandedSelection()
    
    if(! selection.isValid())
        return
        
    var text = _translateSelectionText(selection, func)
    _replaceSelection(selection, text)
}

/* Call a replace function with the selected text

 * Same effect as

replaceTotalText(function(lines){
    return func(lines.join("\n"))
}

*/
function replaceText(func) {
    var selection = view.selection()
    
    if(! selection.isValid())
        return
    
    var text = _translateSelectionText(selection, func)
    _replaceSelection(selection, text)
}

function camelCaseToUnderscore() {
    replaceText(function(text) {
        return _.map(text, function(carac) {
            return carac.toUpperCase() == carac ? '_' + carac.toLowerCase() : carac
        }).join('')
    })
}


function underscoreToCamelCase() {
    replaceText(function(text) {
        return text.replace(/_(.)/g, function(x,m) {
            return m.toUpperCase() == m.toUpperCase() ? x : m.toUpperCase()
        })
    })
}

/**
 * Add [start] before the selection and [end] after and move the cursor before end.
 * If there is no selection, adds [start]+[end] and move the cursor before end.
 */
function encloseSelection(start, end) {
    var selection = view.selection()
    if(! selection.isValid()) {
        document.editBegin();
        document.insertText(view.cursorPosition(), start + end)
        document.editEnd();
    
        var newCursor = view.cursorPosition()
        newCursor.setPosition(newCursor.line, newCursor.column - end.length)
        view.setCursorPosition(newCursor)
    } else {
        document.editBegin();
        document.insertText(selection.end, end);
        document.insertText(selection.start, start);
        document.editEnd();
        selection.start.setPosition(selection.start.line, selection.start.column + start.length)
        selection.end.setPosition(selection.end.line, selection.end.column + start.length)
        view.setSelection(selection)
    }
}

enclose = encloseSelection;

var saveEncloseState = {
    begin: '',
    end: '',
}

/**
 * Save from selected text separated by "%%"
 */
function saveEnclose() {
    var selection = view.selection();
    if(! selection.isValid())
        return
    var txt = document.text(selection)
    var m = null;
    if(m = /(.*)%%(.*)/.exec(txt)) {
        saveEncloseState.begin = m[1]
        saveEncloseState.end = m[2]
        _replaceSelection(selection, '')
    }
}

function encloseCustom() {
    encloseSelection(saveEncloseState.begin, saveEncloseState.end)
}

/**
 * Save from command line.
 * Can run encloseCustom after.
 */
function encloseSave(start, end) {
    saveEncloseState.begin = start
    saveEncloseState.end = end
}


/**
 * example : encloseSelectionHtml('a') -> <a>{}</a>
 */
function encloseSelectionHtml(tag) {
    if(tag.indexOf('#') == -1 && tag.indexOf('.') == -1) {
        encloseSelection('<' + tag + '>', '</' + tag + '>')
    } else {
        var attributes = []
    
        var openSpan = ''
        var closeSpan = ''
        if(tag.indexOf('#') == -1) {
            var tagWithoutId = tag
        } else {
            var NIds = tag.split('#').length - 1
            attributes.push(['id', tag.split('#')[1]])
            if(NIds > 1) {
                var openSpan = (function() { // ''.join('<span id="{id}">' for id in tag.split('#')[2:])
                    var T = tag.split('#')
                    var A = []
                    for(var i = 2; i < T.length; i++)
                        A.push('<span id="' + T[i] + '">')
                    return A.join('')
                })()
                var closeSpan = (function() { // '</span>' * (NIds - 1)
                    var T = []
                    for(var i = 0; i < NIds - 1; i++)
                        T.push('</span>')
                    return T.join('')
                })()
            }
            var tagWithoutId = tag.split('#')[0]
        }
        
        var T = tagWithoutId.split('.')
        var base = T[0] || 'span'
        var cls = T.slice ? T.slice(1).join(' ') : (function(){
            var T2 = []
            for(var i = 1; i < T.length; i++)
                T2.push(T[i])
            return T2.join(' ')
        })()
        if(cls) {
            attributes.push(['class', cls])
        }
        
        var attrs = (function() { // ' '.join(a + '=' + '"' + b + '"' for a,b in attributes)
            var A = []
            for(var i = 0; i < attributes.length; i++)
                A.push(attributes[i][0] + '=' + '"' + attributes[i][1] + '"')
            return A.join(' ')
        })()
        encloseSelection('<' + base + ' ' + attrs + '>' + openSpan, closeSpan + '</' + base + '>')
    }
    
}

encloseHtml = encloseSelectionHtml; // function encloseHtml

function encloseHtmlKbd() {
    return encloseSelectionHtml('kbd');
}

encloseHtmlKeyboard = encloseHtmlKbd; // function encloseHtmlKeyboard

function makepmatrix() {
    return encloseSelection('\\begin{pmatrix}', '\\end{pmatrix}')
}

function makeTrans() {
    var sep = ! view.hasSelection() ? "'" : document.text(view.selection()).indexOf("'") == -1 ? "'" : '"'
    encloseSelection("{% trans " + sep, sep + " %}")
}

function makeBlockTrans() {
    encloseSelection("{% blocktrans %}", "{% endblocktrans %}")
}

function makeSelfTranslation() {
    encloseSelection("{{ ", " | }}")
}

function insertFrenglishSemicolon() {
    document.insertText(view.cursorPosition(), "{{ |}}:")
}

function makeSelfTranslationNoSpace() {
    encloseSelection("{{", "|}}")
}

function makeSelfTranslationTwoLines() {
    encloseSelection("{{\n", "\n|\n}}\n")
}

function makeselftransnospace() {
    encloseSelection("{{", "{% endblocktrans %}")
}

function isHtml(){
    return _.contains(['text/html', 'text/x-html'], document.mimeType())
}

function isLatex() {
    return _.contains(['text/x-tex'], document.mimeType())
}

function makeStrong() {
    if(isLatex())
        encloseSelection('\\textbf{', '}')
    else if(isHtml() || true)
        encloseSelection('<strong>', '</strong>')
}

function makeCode() {
    if(isHtml() || true)
        encloseSelection('<code>', '</code>')
}

function makeEm() {
    if(isLatex())
        encloseSelection('\\emph{', '}')
    else if(isHtml() || true)
        encloseSelection('<em>', '</em>')
}

function makeLink() {
    if(isHtml() || true)
        encloseSelection('<a href="">', '</a>')
}

function mimetype() {
    encloseSelection(document.mimeType(), '')
}

function arrayToLatexMatrix() {
    replaceText(function(text) {
        return text.replace(/\],\[/g, '\\\\').replace(/,/, '&').replace('[[', '\\\\begin{pmatrix}').replace(']]', '\\\\end{pmatrix}')
        
        // bugging function
        var R1 = /\s*\[(.*)\]\s*/
        var R2 = /\s*([^\s]*)\s*/
        var m = R1.exec(text) || R2.exec(text)
        var s = m[1]
        if(m == null)
            return text + ' [error parsing array]';
        var M = []
        var i = 0
        while(i < s.length) {
            var a = s.indexOf('[', i)
            M.push( s.substr(a, b-a).split(',') )
            var b = s.indexOf(']', i)
            i = b+1
        }
        
        return M.map(function(m) { return m.join(' & ') }).join(' \\\\ ')
    })
}


function ipafrench() {
    var data = {
        'e':'ə',
        'é':'e',
        'è':'ɛ',
        'ê':'ɛː',
        'oe':'œ',
        'eu':'ø', 
        'o':'ɔ',
        'ô':'o',
        'au':'o',
        'ou':'u',
        'u':'y',
        'â':'ɑ',
        // useless accents
        'ù':'y',
        'î':'i',
        'û':'y',
        // nasals
        'in':'ɛ\u0303',
        'ain':'ɛ\u0303',
        'ein':'ɛ\u0303',
        'un':'œ\u0303',
        'on':'ɔ\u0303',
        'on':'ɔ\u0303',
        'an':'ɑ\u0303', 
        // consonants
        'r': 'ʁ',
        'ch':'ʃ',
        'j':'ʒ',
        'gn':'ɲ',
        // semivowels
        'ui':'ɥ',
        'y':'j',
        // punctuation
        ':':'ː',
        '--': '‿',
        // probable error
        'c':'?k,s?',
        'h':'??',
        'q':'?k?',
        'x':'?ks?',
    }
    
    if(view.selection().isValid()) {
        replaceText(function(text) {
            return '/' + _.map(text.trim().split(/\s+/), function(tok) {
                return data[tok] ? data[tok] : tok
            }).join('') + '/'
        })
    } else {
        var M = 0
        for(var key in data)
            M = Math.max(M, key.length)
        
        document.editBegin()
        var cursor = view.cursorPosition()
        for(var i = 1; i <= M; i++) {
            view.setSelection(new Range(
                cursor.line, cursor.column - i,
                cursor.line, cursor.column
            ))
            var text = view.selectedText()
            if(data[text]) {
                var selectionRange = view.selection()
                document.removeText(selectionRange)
                document.insertText(selectionRange.start, data[text])
                break;
            }
        }

        document.editEnd()
    }
}

function htmlMarklines() {
    replaceTotalLines(function(lines) {
        return _.map(lines, function(line){
            var T = /(\s*)(.*)/.exec(line)
            var a = T[1]
            var b = T[2]
            return a + '<mark>' + b + '</mark>'
        })
    }) 
}
htmlKeyboard = encloseHtmlKeyboard
htmlEnclose = encloseHtml
