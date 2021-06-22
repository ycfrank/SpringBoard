//retrieves category ID
async function getCategoryIds() {
    try {
      let res = await axios.get('http://jservice.io/api/categories', {
        params: { count: 100, offset: Math.floor(Math.random() * 7220) },
      });
      return _.sampleSize(res.data, 6);
    } catch (error) {
      alert('Error! Try again.');
      throw new Error(error);
    }
  }
  
  //Returns object with clues
  async function getCategory(catId) {
    try {
      let res = await axios.get('http://jservice.io/api/category', {
        params: { id: catId },
      });
      if (res.data.clues_count > 5) {
        return { title: res.data.title, clues: _.sampleSize(res.data.clues, 5) };
      }
      return { title: res.data.title, clues: res.data.clues };
    } catch (error) {
      alert('Error! Try again.');
      throw new Error(error);
    }
  }
  
  //FillHTML table with categories & cells for clues.
  function fillTable(categories) {
    const $gameboard = $('#gameboard');
    const $thead = $('<thead></thead>');
    const $theadRow = $('<tr></tr>');
    const $tbody = $('<tbody></tbody>');
  
    categories.forEach((category, idx) => {
      $theadRow.append(buildCategorySquare(category));
      if (idx < 5) $tbody.append(buildClueSquares(categories, idx));
    });
  
    $thead.append($theadRow);
    $gameboard.append($thead);
    $gameboard.append($tbody);
  }
  
  function buildCategorySquare(category) {
    return $(`<th>${category.title.toUpperCase()}</th>`);
  }
  
  function buildClueSquares(categories, idx) {
    let $tbodyRow = $('<tr></tr>');
  
    let clues = categories.map((category) => category.clues[idx]);
  
    clues.forEach((clue) => {
      let $clueSquare = $(`
        <td class="game-square">
          <span class="showing">
            <i class="fa fa-question-circle" aria-hidden="true"></i>
          </span>
          <span class="question hidden">${clue.question.toUpperCase()}</span>
          <span class="answer hidden">${clue.answer.toUpperCase()}</span>
        </td>
      `);
      $clueSquare.on('animationstart', function () {
        $clueSquare.css('pointer-events', 'none');
      });
      $clueSquare.on('animationend', function () {
        $clueSquare.css('pointer-events', 'auto');
        $clueSquare.removeClass('animate__animated', 'animate__flip');
      });
      $tbodyRow.append($clueSquare);
    })
  
    return $tbodyRow;
  }
  
  function handleClick(evt) {
    //Hide question mark, show question
    if (evt.currentTarget.firstElementChild.classList.contains('showing')) {
      evt.currentTarget.classList.add('animate__animated', 'animate__flip');
      evt.currentTarget.firstElementChild.className = 'hidden';
      evt.currentTarget.firstElementChild.nextElementSibling.className = 'showing';
    }
    //Hide question, show answer
    else if (
      evt.currentTarget.firstElementChild.nextElementSibling.classList.contains('showing')
    ) {
      evt.currentTarget.classList.add(
        'animate__animated',
        'animate__flip',
        'answered',
      );
      evt.currentTarget.firstElementChild.nextElementSibling.className = 'hidden';
      evt.currentTarget.lastElementChild.className = 'showing';
    }
  }
  
  // Clears the current board
  
  function showLoadingView() {
    $('#gameboard').html('');
    $('#btn').text('LOADING...');
  }
  
  // Update the button used to fetch data.
  function hideLoadingView() {
    $('#btn').text('START NEW GAME');
  }
  
  /** Start game:
   * - get random cat ID
   * - retrieve data for each category
   * - create table
   * */
  async function setupAndStart() {
    showLoadingView();
  
    const categoryIds = await getCategoryIds();
  
    const categoriesPromises = categoryIds.map(async (categoryId) => {
      return await getCategory(categoryId.id);
    });
    const categories = await Promise.all(categoriesPromises);
  
    setTimeout(() => {
      fillTable(categories);
      hideLoadingView();
    }, 1500);
  }
  
  //set up game when button is clicked
  $('#btn').click(setupAndStart);
  
  //add event handler for clicking clues
  $('#gameboard').on('click', '.game-square', { event }, handleClick);