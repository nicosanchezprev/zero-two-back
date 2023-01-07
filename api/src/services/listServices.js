const { Anime, List, User } = require('../db.js');

exports.getAllListInfo = async (userId) => {
  try {
    const allListsAux = await List.findAll({ where: {userId}, include: [{
      model: Anime,
      attributes: ['id'],
      through: {
        attributes: []
      }
    }] });
    if(!allListsAux.length) throw new Error('This user doesnt have any lists created');
    let allListsUser;
    allListsUser = await allListsAux.map((list) => {
      list.dataValues.animes = list.animes.length;
      return list;
    })  

    return allListsUser;
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getListInfo = async (id) => {
  try {
    // Aca busco la lista con el id
    const list = await List.findByPk(id, {
      include: [{
        model: Anime,
        attributes: ['id', 'name', 'posterImage', 'showType'],
        through: {
          attributes: []
        }
      }]
    });
    if(!list) throw new Error('List not found');
    return list;
  } catch (err) {
    throw new Error(err.message);
  };
};

exports.postListDb = async (listInfo) => {
  const listName = listInfo.name;
  const email = listInfo.email;
  
  try {
    const user = await User.findOne({ where: {email: email} });
    if(!user) throw new Error('The user does not exists');
    if(!listName) throw new Error('The list needs a name!');
    if(listName.length < 2) throw new Error('The list needs 2 or more characters!');
    delete listInfo.email;
    await List.create(listInfo);

    const newList = await List.findOne({ where: {name: listName} });
    await newList.setUser(user);
    return 'List created succesfully!';
  } catch (err) {
    throw new Error(err.message);
  };
};

exports.addAnimeToList = async (listInfo) => {
  const animeId = listInfo.anime; // id of the anime
  const listId = listInfo.list; // id of the list

  try {
    const anime = await Anime.findOne({ where: {id: animeId} });
    const list = await List.findOne({ where: {id: listId} });

    if(!anime) {
      throw new Error('Anime not found');
    } else if (!list) {
      throw new Error('List not found');
    } else {
      const listChecked = await List.findByPk(listId, {
        include: [{
          model: Anime,
          where: { id: animeId },
          through: {
            attributes: []
          }
        }]
      });
      if(listChecked) {
        throw new Error('The anime is already added to the list!');
      } else {
        // Add the relationship to list from anime
        await list.addAnime(anime);
        return 'Anime added to list succesfully!';
      }
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.editNameList = async (listInfo) => {
  const newName = listInfo.name;
  const listId = listInfo.id;

  try {
    const list = await List.findOne({ where: {id: listId} });
    if (!list) throw new Error('List not found');
  
    list.name = newName;
    await list.save();
    return 'List edited succesfully!';
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.destroyList = async (id) => {
  try {
    const deletingList = await List.findOne({ where: {id: id} });
    if(!deletingList) {
      throw new Error('List could not be founded');
    } else {
      await List.destroy({where: {id: id} });
      return 'List deleted successfully!';
    }
  } catch (err) {
    throw new Error(err.message);
  }
};