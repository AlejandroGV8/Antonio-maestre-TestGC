const referencias = {};

const asignarReferencia = (numeros, referenciaTema, extractoTema) => {
  numeros.forEach((numero) => {
    referencias[numero] = { referenciaTema, extractoTema };
  });
};

const referenciaProvisional =
  'Referencia provisional para la prueba. El párrafo exacto de apoyo no aparece con literalidad suficiente en el texto pegado y conviene afinarlo cuando tengamos el PDF maquetado o el tema completo revisado.';

asignarReferencia(
  [1, 71],
  'TEMA 11 · 11.1 Objeto y ámbito de la ley orgánica',
  'No será de aplicación a los tratamientos: a) excluidos del ámbito de aplicación del Reglamento general de protección de datos; b) de datos de personas fallecidas; c) sometidos a la normativa sobre protección de materias clasificadas.'
);

asignarReferencia(
  [2, 4, 101, 102],
  'TEMA 11 · 11.7 Autoridades de protección de datos',
  'La Agencia Española de Protección de Datos es una autoridad administrativa independiente de ámbito estatal, con personalidad jurídica y plena capacidad pública y privada, que actúa con plena independencia de los poderes públicos en el ejercicio de sus funciones. Su denominación oficial es Agencia Española de Protección de Datos, Autoridad Administrativa Independiente. Tendrá la condición de representante común de las autoridades de protección de datos del Reino de España en el Comité Europeo de Protección de Datos.'
);

asignarReferencia(
  [3],
  'TEMA 11 · 11.7 Estructura de la AEPD',
  referenciaProvisional
);

asignarReferencia(
  [5, 82, 116, 117],
  'TEMA 11 · 11.5 Responsable y encargado del tratamiento · Bloqueo de datos',
  'El responsable del tratamiento estará obligado a bloquear los datos cuando proceda a su rectificación o supresión. El bloqueo de los datos consiste en la identificación y reserva de los mismos, adoptando medidas técnicas y organizativas, para impedir su tratamiento, incluyendo su visualización, salvo para su puesta a disposición de jueces y tribunales, Ministerio Fiscal o Administraciones Públicas competentes.'
);

asignarReferencia(
  [6, 36],
  'TEMA 11 · Sistemas internos de denuncias',
  referenciaProvisional
);

asignarReferencia(
  [7, 84, 85],
  'TEMA 11 · 11.5 Delegado de protección de datos',
  'Los responsables y encargados del tratamiento comunicarán en el plazo de 10 días a la Agencia Española de Protección de Datos o, en su caso, a las autoridades autonómicas de protección de datos, las designaciones, nombramientos y ceses de los delegados de protección de datos. El delegado de protección de datos actuará como interlocutor del responsable o encargado del tratamiento ante la Agencia y las autoridades autonómicas.'
);

asignarReferencia(
  [8],
  'TEMA 11 · 11.1 Objeto y ámbito de la ley orgánica',
  referenciaProvisional
);

asignarReferencia(
  [9],
  'TEMA 11 · 11.3 Derechos de las personas · Derecho de rectificación',
  'Al ejercer el Derecho de rectificación el afectado deberá indicar en su solicitud a qué datos se refiere y la corrección que haya de realizarse. Deberá acompañar, cuando sea preciso, la documentación justificativa de la inexactitud o carácter incompleto de los datos.'
);

asignarReferencia(
  [10],
  'TEMA 11 · 11.3 Derechos de las personas · Derecho de acceso',
  referenciaProvisional
);

asignarReferencia(
  [11],
  'TEMA 11 · 11.7 Actividad de investigación de la AEPD',
  'Las Administraciones Públicas, incluidas las tributarias y de la Seguridad Social, y los particulares están obligados a proporcionar a la Agencia los datos, informes, antecedentes y justificantes necesarios para llevar a cabo su actividad de investigación.'
);

asignarReferencia(
  [12, 13, 52, 79],
  'TEMA 11 · 11.4 Tratamientos concretos · Cámaras y videocámaras',
  'Las personas físicas o jurídicas, públicas o privadas, podrán llevar a cabo el tratamiento de imágenes a través de sistemas de cámaras o videocámaras con la finalidad de preservar la seguridad de las personas y bienes, y de sus instalaciones. Cuando esto resulte imprescindible podrán captarse imágenes de la vía pública. Los datos serán suprimidos en el plazo máximo de 1 mes desde su captación. En tal caso, las imágenes deben ser puestas a disposición de la autoridad competente en un plazo máximo de 72 horas desde que se conozca que existe la grabación.'
);

asignarReferencia(
  [14],
  'TEMA 11 · 11.6 Transferencia internacional de datos',
  'Las transferencias internacionales de datos se regirán por lo dispuesto en el Reglamento, en la presente ley orgánica y sus normas de desarrollo aprobadas por el Gobierno, y en las circulares de la Agencia y de las autoridades autonómicas de protección de datos.'
);

asignarReferencia(
  [15, 65],
  'TEMA 11 · 11.7 Planes de auditoría y directrices',
  'La Presidencia de la Agencia podrá acordar la realización de planes de auditoría preventiva, referidos a los tratamientos de un sector concreto de actividad. A resultas de los planes de auditoría, la Presidencia podrá dictar las directrices generales o específicas para un concreto responsable o encargado de los tratamientos. Las directrices son de obligado cumplimiento.'
);

asignarReferencia(
  [16, 45, 75],
  'TEMA 11 · 11.2 Consentimiento de los menores de edad',
  'El tratamiento de estos datos personales únicamente podrá fundarse en su consentimiento cuando sea mayor de 14 años. El tratamiento de los datos de los menores de 14 años, fundado en el consentimiento, será lícito si consta el del titular de la patria potestad o tutela, con el alcance que estos determinen.'
);

asignarReferencia(
  [17, 90, 103],
  'TEMA 11 · 11.7 Relación de la AEPD con el Gobierno',
  'Se relaciona con el Gobierno a través del Ministerio de Justicia.'
);

asignarReferencia(
  [18],
  'TEMA 11 · 11.3 Derecho de supresión',
  'Si la supresión de datos deriva del ejercicio del derecho de oposición, el responsable podrá conservar los datos identificativos del afectado necesarios con el fin de impedir tratamientos futuros para fines de mercadotecnia directa.'
);

asignarReferencia(
  [19, 62, 109],
  'TEMA 11 · 11.7 Consejo Consultivo de la AEPD · Composición',
  'Expertos, propuestos: 2 por las Organizaciones Empresariales; 2 por las organizaciones sindicales más representativas; 1 por la Federación Española de Municipios y Provincias; 1 por el Consejo de Consumidores y Usuarios.'
);

asignarReferencia(
  [20, 60, 92],
  'TEMA 11 · 11.7 Presidencia y Adjunto de la AEPD',
  'La Presidencia y el Adjunto de la Agencia son nombrados por el Consejo de Ministros mediante Real Decreto. Sus mandatos tienen una duración de 5 años y puede ser renovado por otro período igual.'
);

asignarReferencia(
  [21, 34, 42, 72],
  'TEMA 11 · 11.1 Datos de personas fallecidas',
  'Las personas vinculadas al fallecido por razones familiares o de hecho así como sus herederos podrán dirigirse al responsable o encargado del tratamiento para solicitar el acceso a los datos personales de aquella y, su rectificación o supresión, salvo que la persona fallecida lo hubiese prohibido expresamente o así lo establezca una ley. Dicha prohibición no afecta al derecho de los herederos a acceder a los datos de carácter patrimonial del causante. En caso de fallecimiento de menores, podrán ejercerse también por sus representantes legales o, en el marco de sus competencias, por el Ministerio Fiscal.'
);

asignarReferencia(
  [22],
  'TEMA 11 · 11.5 Bloqueo y destrucción de datos',
  'Transcurrido el plazo de prescripción de posibles responsabilidades derivadas del tratamiento de los datos bloqueados debe procederse a la destrucción de los datos.'
);

asignarReferencia(
  [23, 24, 35, 40, 41, 112, 113, 114, 115],
  'TEMA 11 · Referencia pendiente de afinar',
  referenciaProvisional
);

asignarReferencia(
  [25],
  'TEMA 11 · 11.7 Colaboración institucional',
  'La Agencia, el Consejo General del Poder Judicial y en su caso, la Fiscalía General del Estado, colaborarán en aras del adecuado ejercicio de las respectivas competencias que la Ley Orgánica del Poder Judicial les atribuye en materia de protección de datos personales en el ámbito de la Administración de Justicia.'
);

asignarReferencia(
  [26, 86],
  'TEMA 11 · 11.5 Códigos de conducta',
  'Los códigos de conducta serán vinculantes para quienes se adhieran a los mismos y podrán dotarse de mecanismos de resolución extrajudicial de conflictos.'
);

asignarReferencia(
  [27],
  'TEMA 11 · 11.7 Control económico-financiero',
  'Sin perjuicio de las competencias atribuidas al Tribunal de Cuentas, la gestión económico-financiera de la Agencia está sometida al control de la Intervención General de la Administración del Estado.'
);

asignarReferencia(
  [28],
  'TEMA 11 · 11.8 Reclamaciones y competencia',
  'La Agencia debe, antes de realizar cualquier otra actuación, examinar su competencia y determinar el carácter nacional o transfronterizo del procedimiento a seguir. El acuerdo de la remisión a la autoridad de control competente implica el archivo provisional del procedimiento.'
);

asignarReferencia(
  [29, 48],
  'TEMA 11 · 11.3 Derecho de acceso',
  'El Derecho de acceso se entiende otorgado si el responsable del tratamiento facilita al afectado un sistema de acceso remoto, directo y seguro a los datos personales que garantice, de modo permanente, el acceso a su totalidad. Se podrá considerar repetitivo el ejercicio del derecho de acceso en más de una ocasión durante el plazo de 6 meses, a menos que exista causa legítima.'
);

asignarReferencia(
  [30, 70],
  'TEMA 11 · 11.8 Duración del procedimiento sancionador',
  'Si tiene por objeto la determinación de la posible existencia de una infracción, se inicia mediante acuerdo de inicio. El procedimiento tendrá una duración máxima de 9 meses a contar desde la fecha del acuerdo de inicio o del proyecto de acuerdo de inicio.'
);

asignarReferencia(
  [31, 49, 77],
  'TEMA 11 · 11.3 Derecho de supresión',
  'Derecho de supresión: El interesado tiene derecho a obtener del responsable del tratamiento la supresión de los datos sin dilación indebida, igualmente, el encargado estará obligado a suprimir los datos personales que ya no sean necesarios, cuando se retire el consentimiento o exista oposición, hayan sido tratados ilícitamente, deban suprimirse por obligación legal o se hayan obtenido en relación a la oferta de servicios de la sociedad de la información.'
);

asignarReferencia(
  [32, 66],
  'TEMA 11 · 11.7 Circulares de la Agencia',
  'La Presidencia podrá dictar disposiciones que fijen los criterios a que responderá la actuación de esta autoridad en la aplicación de lo dispuesto en el Reglamento y en la presente ley orgánica, que se denominarán Circulares de la Agencia.'
);

asignarReferencia(
  [33],
  'TEMA 11 · 11.8 Procedimiento por falta de atención de derechos',
  'Si el procedimiento se refiere exclusivamente a la falta de atención de una solicitud de ejercicio de los derechos, se iniciará por acuerdo de admisión a trámite. El plazo para resolver el procedimiento es de 6 meses desde la fecha de notificación al reclamante del acuerdo de admisión a trámite.'
);

asignarReferencia(
  [37],
  'TEMA 11 · 11.8 Reclamación por falta de atención de derechos',
  'Si el procedimiento se refiere exclusivamente a la falta de atención de una solicitud de ejercicio de los derechos, se iniciará por acuerdo de admisión a trámite. El plazo para resolver el procedimiento es de 6 meses desde la fecha de notificación al reclamante del acuerdo de admisión a trámite.'
);

asignarReferencia(
  [38],
  'TEMA 11 · 11.3 Ejercicio de derechos',
  'El ejercicio de derechos podrá ejercerse directamente o por representante legal o voluntario. Las actuaciones del responsable del tratamiento para atender las solicitudes de ejercicio de estos derechos serán gratuitas.'
);

asignarReferencia(
  [43, 73],
  'TEMA 11 · 11.2 Principio de exactitud',
  'Los datos serán exactos y, si fuere necesario, actualizados. No será imputable al responsable del tratamiento, siempre que haya adoptado todas las medidas razonables para suprimir o rectificar sin dilación, la inexactitud de los datos personales, cuando los datos inexactos han sido obtenidos por el responsable directamente del afectado, de un mediador, de un registro público o por portabilidad.'
);

asignarReferencia(
  [44, 74],
  'TEMA 11 · 11.2 Deber de confidencialidad',
  'Los responsables y encargados del tratamiento y todas las personas que intervengan en cualquier fase estarán sujetas al deber de confidencialidad. La obligación anterior será complementaria de los deberes de secreto profesional.'
);

asignarReferencia(
  [46],
  'TEMA 11 · 11.2 Tratamiento de datos de naturaleza penal',
  'El tratamiento de datos personales relativos a condenas e infracciones penales, y a procedimientos y medidas cautelares y de seguridad conexas, para fines distintos de los de prevención, investigación, detección o enjuiciamiento, solo podrá llevarse a cabo cuando se encuentre amparado en una norma de Derecho de la Unión, en esta ley orgánica o en otras normas de rango legal.'
);

asignarReferencia(
  [47, 76],
  'TEMA 11 · 11.3 Deber de información',
  'La información básica deberá contener, al menos: la identidad del responsable del tratamiento y de su representante, en su caso; la finalidad del tratamiento; la posibilidad de ejercer los derechos de acceso. Si fueran a ser tratados para la elaboración de perfiles, la información básica comprenderá asimismo esta circunstancia. Si los datos no han sido obtenidos del afectado, la información básica incluirá también las categorías de datos objeto de tratamiento y las fuentes de las que procedan los datos.'
);

asignarReferencia(
  [50],
  'TEMA 11 · 11.4 Datos de contacto en personas jurídicas',
  'Salvo prueba en contrario, se presumirá lícito el tratamiento de los datos de contacto y los relativos a la función o puesto de las personas físicas que presten servicios en una persona jurídica, siempre que el tratamiento se refiera solo a los datos necesarios para su localización profesional y la finalidad sea únicamente mantener relaciones con la persona jurídica donde preste sus servicios.'
);

asignarReferencia(
  [51],
  'TEMA 11 · 11.4 Sistemas comunes de información crediticia',
  'Salvo prueba en contrario, se presumirá lícito el tratamiento de datos personales relativos al incumplimiento de obligaciones dinerarias, financieras o de crédito por sistemas comunes de información crediticia cuando el acreedor haya informado al afectado en el contrato o en el momento de requerir el pago acerca de la posibilidad de inclusión en dichos sistemas y con indicación de aquéllos en los que participe.'
);

asignarReferencia(
  [53, 81],
  'TEMA 11 · 11.4 Tratamiento de datos de infracciones y sanciones administrativas',
  'Si no se cumpla alguna de estas condiciones, habrá que contar con el consentimiento del interesado o estar autorizados por una norma con rango de ley. Fuera de los supuestos anteriores, el tratamiento de datos de infracciones y sanciones administrativas solo será posible llevado a cabo por abogados y procuradores y cuando tengan por objeto recoger la información facilitada por sus clientes para el ejercicio de sus funciones. Los responsables de dichos tratamientos serán los órganos competentes para instruir el procedimiento sancionador, para declarar las infracciones o imponer las sanciones.'
);

asignarReferencia(
  [54, 111],
  'TEMA 11 · 11.5 Medidas técnicas y organizativas',
  'Los responsables y encargados determinarán las medidas técnicas y organizativas apropiadas que deben aplicar a fin de garantizar y acreditar que el tratamiento es conforme con el Reglamento, con la presente ley orgánica y con la legislación sectorial aplicable.'
);

asignarReferencia(
  [56],
  'TEMA 11 · 11.5 Garantías del delegado de protección de datos',
  'Si se trata de una persona física integrada en la organización del responsable o encargado del tratamiento, el delegado no podrá ser removido ni sancionado por el responsable o el encargado por desempeñar sus funciones, salvo que incurra en dolo o negligencia grave.'
);

asignarReferencia(
  [57],
  'TEMA 11 · 11.6 Transferencias por intereses legítimos imperiosos',
  'Los responsables del tratamiento deberán informar a la Agencia o a las autoridades autonómicas de protección de datos, de cualquier transferencia internacional de datos que pretendan llevar a cabo sobre la base de su necesidad para fines relacionados con intereses legítimos imperiosos perseguidos por aquéllos.'
);

asignarReferencia(
  [58],
  'TEMA 11 · 11.6 Cláusulas contractuales tipo',
  'La Agencia y las autoridades autonómicas de protección de datos podrán adoptar cláusulas contractuales tipo para la realización de transferencias internacionales de datos, que se someterán previamente al dictamen del Comité Europeo de Protección de Datos.'
);

asignarReferencia(
  [59, 104],
  'TEMA 11 · 11.7 Estatuto de la AEPD',
  'El Gobierno, a propuesta de la Agencia, aprobará su Estatuto mediante real decreto.'
);

asignarReferencia(
  [61],
  'TEMA 11 · 11.7 Separación de la Presidencia de la AEPD',
  'Previa evaluación, la propuesta deberá ser ratificada por la Comisión de Justicia en votación pública por mayoría de 3/5 en primera votación o por mayoría absoluta en segunda votación. En los supuestos de separación por incumplimiento grave, incapacidad o incompatibilidad será necesaria la ratificación de la separación por las mayorías parlamentarias previstas en primera y segunda votación.'
);

asignarReferencia(
  [63, 93, 110],
  'TEMA 11 · 11.7 Consejo Consultivo de la AEPD',
  'Los miembros del Consejo Consultivo son nombrados por orden del Ministro de Justicia, publicada en el BOE. Se reúne cuando lo disponga la Presidencia y, en todo caso, 1 vez al semestre. Sus decisiones no tendrán en ningún caso carácter vinculante.'
);

asignarReferencia(
  [64],
  'TEMA 11 · 11.7 Facultades de investigación de la AEPD',
  'Si la conducta contraria al Reglamento se ha realizado mediante la utilización de un servicio de telefonía fija o móvil, la Agencia podrá recabar la confirmación de haberse realizado la llamada entre dos números en fecha y hora determinada.'
);

asignarReferencia(
  [67],
  'TEMA 11 · 11.7 Acción exterior del Estado en materia de protección de datos',
  'Corresponde a la Agencia la titularidad y ejercicio de las funciones relacionadas con la acción exterior del Estado en materia de protección de datos.'
);

asignarReferencia(
  [68],
  'TEMA 11 · 11.8 Regulación de procedimientos de la AEPD',
  'El Gobierno regulará por real decreto los procedimientos que tramite la Agencia, asegurando en todo caso los derechos de defensa y audiencia de los interesados.'
);

asignarReferencia(
  [69],
  'TEMA 11 · 11.8 Inadmisión de reclamaciones',
  'Inadmitirá las reclamaciones presentadas cuando no versen sobre cuestiones de protección de datos personales, carezcan manifiestamente de fundamento, sean abusivas o no aporten indicios racionales de la existencia de una infracción.'
);

asignarReferencia(
  [78],
  'TEMA 11 · 11.3 Derecho de portabilidad',
  'Derecho de portabilidad: Se tiene derecho a recibir los datos en un formato estructurado, de uso común y lectura mecánica y a transmitirlos a otro responsable, cuando el tratamiento esté basado en el consentimiento o en un contrato y cuando el tratamiento se efectúe por medios automatizados.'
);

asignarReferencia(
  [80],
  'TEMA 11 · 11.4 Función estadística pública',
  'Los organismos competentes para ejercer la función estadística pública podrán denegar las solicitudes de los afectados para ejercer sus derechos cuando los datos se encuentren amparados por las garantías del secreto estadístico previstas en la legislación estatal o autonómica.'
);

asignarReferencia(
  [83, 119, 120],
  'TEMA 11 · 11.5 Responsable y encargado del tratamiento',
  'Tendrá la consideración de responsable del tratamiento y no la de encargado quien en su propio nombre y sin que conste que actúa por cuenta de otro, establezca relaciones con los afectados. Tendrá también la consideración de responsable del tratamiento quien figurando como encargado utilizase los datos para sus propias finalidades. No se considerará comunicación de datos el acceso del encargado cuando resulte necesario para la prestación de un servicio al responsable.'
);

asignarReferencia(
  [87, 88],
  'TEMA 11 · 11.5 Aprobación y registro de códigos de conducta',
  'Los códigos de conducta serán aprobados por la Agencia o por la autoridad autonómica de protección de datos competente. La Agencia y las autoridades autonómicas de protección de datos mantendrán registros de los códigos de conducta aprobados por las mismas, que estarán interconectados entre sí y coordinados con el registro gestionado por el Comité Europeo de Protección de Datos.'
);

asignarReferencia(
  [89],
  'TEMA 11 · 11.5 Certificación',
  'La acreditación de las instituciones de certificación podrá ser llevada a cabo por la Entidad Nacional de Acreditación (ENAC).'
);

asignarReferencia(
  [91],
  'TEMA 11 · 11.7 Personal al servicio de la AEPD',
  'El personal a su servicio será funcionario o laboral.'
);

asignarReferencia(
  [94],
  'TEMA 11 · 11.7 Actividad de investigación',
  'Los funcionarios que desarrollen actividades de investigación tienen la consideración de agentes de la autoridad en el ejercicio de sus funciones.'
);

asignarReferencia(
  [95],
  'TEMA 11 · 11.7 Cooperación con autoridades autonómicas',
  'La Presidencia de la Agencia convoca, por iniciativa propia o si lo solicita otra autoridad, a las autoridades autonómicas de protección de datos. Se celebrarán reuniones semestrales de cooperación.'
);

asignarReferencia(
  [96],
  'TEMA 11 · 11.8 Inicio del procedimiento sancionador',
  'Si tiene por objeto la determinación de la posible existencia de una infracción, se inicia mediante acuerdo de inicio adoptado por propia iniciativa o como consecuencia de reclamación.'
);

asignarReferencia(
  [97],
  'TEMA 11 · 11.8 Medidas provisionales',
  'Si la Agencia considera que la continuación del tratamiento de los datos personales, su comunicación o transferencia internacional comporta un menoscabo grave del derecho a la protección de datos personales, podrá ordenar a los responsables o encargados de los tratamientos su bloqueo y la cesación de su tratamiento y, en caso de incumplirse por éstos dichos mandatos, proceder a su inmovilización.'
);

asignarReferencia(
  [98],
  'TEMA 11 · 11.8 Admisión o inadmisión de reclamaciones',
  'La decisión sobre la admisión o inadmisión, debe notificarse al reclamante en el plazo de 3 meses.'
);

asignarReferencia(
  [99],
  'TEMA 11 · 11.8 Actuaciones previas de investigación',
  'Las actuaciones previas de investigación no podrán tener una duración superior a 12 meses a contar desde la fecha del acuerdo de admisión a trámite o de la fecha del acuerdo por el que se decida su iniciación.'
);

asignarReferencia(
  [100],
  'TEMA 11 · Introducción',
  'La protección de las personas físicas en relación con el tratamiento de datos personales es un derecho fundamental protegido por el art. 18.4 de la Constitución.'
);

asignarReferencia(
  [105],
  'TEMA 11 · 11.7 Presupuesto de la AEPD',
  'La Agencia elabora y aprueba su presupuesto y lo remitirá al Gobierno para que sea integrado, con independencia, en los Presupuestos Generales del Estado.'
);

asignarReferencia(
  [106],
  'TEMA 11 · 11.7 Modificaciones presupuestarias',
  'Su Presidencia autoriza las modificaciones presupuestarias que impliquen hasta un 3% de la cifra inicial de su presupuesto total de gastos, siempre que no se incrementen los créditos para gastos de personal.'
);

asignarReferencia(
  [107],
  'TEMA 11 · 11.7 Relación de puestos de trabajo',
  referenciaProvisional
);

asignarReferencia(
  [108],
  'TEMA 11 · 11.7 Presidencia de la AEPD',
  'La Presidencia de la AEPD dirige la AEPD, ostenta su representación y dicta sus resoluciones, circulares y directrices. Está auxiliada por un Adjunto. Ambos son nombrados por el Gobierno, a propuesta del Ministerio de Justicia. Sus mandatos tienen una duración de 5 años y puede ser renovado por otro período igual.'
);

asignarReferencia(
  [111],
  'TEMA 11 · 11.5 Medidas técnicas y organizativas',
  'Los responsables y encargados determinarán las medidas técnicas y organizativas apropiadas que deben aplicar a fin de garantizar y acreditar que el tratamiento es conforme con el Reglamento, con la presente ley orgánica, sus normas de desarrollo y la legislación sectorial aplicable.'
);

asignarReferencia(
  [118],
  'TEMA 11 · 11.5 Copiado seguro de la información',
  'Si la configuración del sistema de información no permite el bloqueo o se requiere una adaptación que implique un esfuerzo desproporcionado, se procederá a un copiado seguro de la información de modo que conste evidencia digital, o de otra naturaleza, que permita acreditar su autenticidad, la fecha del bloqueo y la no manipulación de los datos durante el mismo.'
);

export default referencias;